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
import { getEntity, updateEntity, createEntity, reset } from './children.reducer';
import { IChildren } from 'app/shared/model/children.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChildrenUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IChildrenUpdateState {
  isNew: boolean;
  idstutors: any[];
  childrenGroupId: string;
}

export class ChildrenUpdate extends React.Component<IChildrenUpdateProps, IChildrenUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idstutors: [],
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
      const { childrenEntity } = this.props;
      const entity = {
        ...childrenEntity,
        ...values,
        tutors: mapIdList(values.tutors)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/children');
  };

  render() {
    const { childrenEntity, users, childrenGroups, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pendaApp.children.home.createOrEditLabel">
              <Translate contentKey="pendaApp.children.home.createOrEditLabel">Create or edit a Children</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : childrenEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="children-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="pendaApp.children.name">Name</Translate>
                  </Label>
                  <AvField
                    id="children-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="users">
                    <Translate contentKey="pendaApp.children.tutors">Tutors</Translate>
                  </Label>
                  <AvInput
                    id="children-tutors"
                    type="select"
                    multiple
                    className="form-control"
                    name="tutors"
                    value={childrenEntity.tutors && childrenEntity.tutors.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/children" replace color="info">
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
  childrenEntity: storeState.children.entity,
  loading: storeState.children.loading,
  updating: storeState.children.updating,
  updateSuccess: storeState.children.updateSuccess
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
)(ChildrenUpdate);
