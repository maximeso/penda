import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IChildrenGroup } from 'app/shared/model/children-group.model';
import { getEntities as getChildrenGroups } from 'app/entities/children-group/children-group.reducer';
import { getEntity, updateEntity, createEntity, reset } from './event-group.reducer';
import { IEventGroup } from 'app/shared/model/event-group.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEventGroupUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEventGroupUpdateState {
  isNew: boolean;
  childrenGroupId: string;
}

export class EventGroupUpdate extends React.Component<IEventGroupUpdateProps, IEventGroupUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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

    this.props.getChildrenGroups();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { eventGroupEntity } = this.props;
      const entity = {
        ...eventGroupEntity,
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
    this.props.history.push('/entity/event-group');
  };

  render() {
    const { eventGroupEntity, childrenGroups, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pendaApp.eventGroup.home.createOrEditLabel">
              <Translate contentKey="pendaApp.eventGroup.home.createOrEditLabel">Create or edit a EventGroup</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : eventGroupEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="event-group-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="createdDateLabel" for="createdDate">
                    <Translate contentKey="pendaApp.eventGroup.createdDate">Created Date</Translate>
                  </Label>
                  <AvField
                    id="event-group-createdDate"
                    type="date"
                    className="form-control"
                    name="createdDate"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="pendaApp.eventGroup.name">Name</Translate>
                  </Label>
                  <AvField
                    id="event-group-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="childrenGroup.id">
                    <Translate contentKey="pendaApp.eventGroup.childrenGroup">Children Group</Translate>
                  </Label>
                  <AvInput
                    id="event-group-childrenGroup"
                    type="select"
                    className="form-control"
                    name="childrenGroup.id"
                    value={isNew ? childrenGroups[0] && childrenGroups[0].id : eventGroupEntity.childrenGroup.id}
                  >
                    {childrenGroups
                      ? childrenGroups.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/event-group" replace color="info">
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
  childrenGroups: storeState.childrenGroup.entities,
  eventGroupEntity: storeState.eventGroup.entity,
  loading: storeState.eventGroup.loading,
  updating: storeState.eventGroup.updating,
  updateSuccess: storeState.eventGroup.updateSuccess
});

const mapDispatchToProps = {
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
)(EventGroupUpdate);
