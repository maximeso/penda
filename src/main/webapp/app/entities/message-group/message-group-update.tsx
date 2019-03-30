import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IChildrenGroup } from 'app/shared/model/children-group.model';
import { getEntities as getChildrenGroups } from 'app/entities/children-group/children-group.reducer';
import { getEntity, updateEntity, createEntity, reset } from './message-group.reducer';
import { IMessageGroup } from 'app/shared/model/message-group.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMessageGroupUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMessageGroupUpdateState {
  isNew: boolean;
  creatorId: string;
  childrenGroupId: string;
}

export class MessageGroupUpdate extends React.Component<IMessageGroupUpdateProps, IMessageGroupUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      creatorId: '0',
      childrenGroupId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
    this.props.getChildrenGroups();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { messageGroupEntity } = this.props;
      const entity = {
        ...messageGroupEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/message-group');
  };

  render() {
    const { messageGroupEntity, users, childrenGroups, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pendaApp.messageGroup.home.createOrEditLabel">
              <Translate contentKey="pendaApp.messageGroup.home.createOrEditLabel">Create or edit a MessageGroup</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : messageGroupEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="message-group-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="createdDateLabel" for="createdDate">
                    <Translate contentKey="pendaApp.messageGroup.createdDate">Created Date</Translate>
                  </Label>
                  <AvField
                    id="message-group-createdDate"
                    type="date"
                    className="form-control"
                    name="createdDate"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="messageLabel" for="message">
                    <Translate contentKey="pendaApp.messageGroup.message">Message</Translate>
                  </Label>
                  <AvField
                    id="message-group-message"
                    type="text"
                    name="message"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="creator.email">
                    <Translate contentKey="pendaApp.messageGroup.creator">Creator</Translate>
                  </Label>
                  <AvInput
                    id="message-group-creator"
                    type="select"
                    className="form-control"
                    name="creator.id"
                    value={isNew ? users[0] && users[0].id : messageGroupEntity.creator.id}
                  >
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.email}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="childrenGroup.name">
                    <Translate contentKey="pendaApp.messageGroup.childrenGroup">Children Group</Translate>
                  </Label>
                  <AvInput
                    id="message-group-childrenGroup"
                    type="select"
                    className="form-control"
                    name="childrenGroup.id"
                    value={isNew ? childrenGroups[0] && childrenGroups[0].id : messageGroupEntity.childrenGroup.id}
                  >
                    {childrenGroups
                      ? childrenGroups.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/message-group" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  childrenGroups: storeState.childrenGroup.entities,
  messageGroupEntity: storeState.messageGroup.entity,
  loading: storeState.messageGroup.loading,
  updating: storeState.messageGroup.updating,
  updateSuccess: storeState.messageGroup.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getChildrenGroups,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageGroupUpdate);
