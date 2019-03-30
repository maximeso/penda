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
import { IChildren } from 'app/shared/model/children.model';
import { getEntities as getChildren } from 'app/entities/children/children.reducer';
import { getEntity, updateEntity, createEntity, reset } from './observation.reducer';
import { IObservation } from 'app/shared/model/observation.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IObservationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IObservationUpdateState {
  isNew: boolean;
  creatorId: string;
  childrenId: string;
}

export class ObservationUpdate extends React.Component<IObservationUpdateProps, IObservationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      creatorId: '0',
      childrenId: '0',
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
    this.props.getChildren();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { observationEntity } = this.props;
      const entity = {
        ...observationEntity,
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
    this.props.history.push('/entity/observation');
  };

  render() {
    const { observationEntity, users, children, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pendaApp.observation.home.createOrEditLabel">
              <Translate contentKey="pendaApp.observation.home.createOrEditLabel">Create or edit a Observation</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : observationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="observation-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="createdDateLabel" for="createdDate">
                    <Translate contentKey="pendaApp.observation.createdDate">Created Date</Translate>
                  </Label>
                  <AvField
                    id="observation-createdDate"
                    type="date"
                    className="form-control"
                    name="createdDate"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="pendaApp.observation.description">Description</Translate>
                  </Label>
                  <AvField
                    id="observation-description"
                    type="text"
                    name="description"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="creator.email">
                    <Translate contentKey="pendaApp.observation.creator">Creator</Translate>
                  </Label>
                  <AvInput
                    id="observation-creator"
                    type="select"
                    className="form-control"
                    name="creator.id"
                    value={isNew ? users[0] && users[0].id : observationEntity.creator.id}
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
                  <Label for="children.name">
                    <Translate contentKey="pendaApp.observation.children">Children</Translate>
                  </Label>
                  <AvInput
                    id="observation-children"
                    type="select"
                    className="form-control"
                    name="children.id"
                    value={isNew ? children[0] && children[0].id : observationEntity.children.id}
                  >
                    {children
                      ? children.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/observation" replace color="info">
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
  children: storeState.children.entities,
  observationEntity: storeState.observation.entity,
  loading: storeState.observation.loading,
  updating: storeState.observation.updating,
  updateSuccess: storeState.observation.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getChildren,
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
)(ObservationUpdate);
