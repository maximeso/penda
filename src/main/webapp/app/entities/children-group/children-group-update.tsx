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
import { getEntity, updateEntity, createEntity, reset } from './children-group.reducer';
import { IChildrenGroup } from 'app/shared/model/children-group.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChildrenGroupUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IChildrenGroupUpdateState {
  isNew: boolean;
  idschildrens: any[];
  responsableId: string;
}

export class ChildrenGroupUpdate extends React.Component<IChildrenGroupUpdateProps, IChildrenGroupUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idschildrens: [],
      responsableId: '0',
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
      const { childrenGroupEntity } = this.props;
      const entity = {
        ...childrenGroupEntity,
        ...values,
        childrens: mapIdList(values.childrens)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/children-group');
  };

  render() {
    const { childrenGroupEntity, users, children, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pendaApp.childrenGroup.home.createOrEditLabel">
              <Translate contentKey="pendaApp.childrenGroup.home.createOrEditLabel">Create or edit a ChildrenGroup</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : childrenGroupEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="children-group-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="pendaApp.childrenGroup.name">Name</Translate>
                  </Label>
                  <AvField
                    id="children-group-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="responsable.email">
                    <Translate contentKey="pendaApp.childrenGroup.responsable">Responsable</Translate>
                  </Label>
                  <AvInput id="children-group-responsable" type="select" className="form-control" name="responsable.id">
                    <option value="" key="0" />
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
                  <Label for="children">
                    <Translate contentKey="pendaApp.childrenGroup.childrens">Childrens</Translate>
                  </Label>
                  <AvInput
                    id="children-group-childrens"
                    type="select"
                    multiple
                    className="form-control"
                    name="childrens"
                    value={childrenGroupEntity.childrens && childrenGroupEntity.childrens.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {children
                      ? children.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/children-group" replace color="info">
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
  childrenGroupEntity: storeState.childrenGroup.entity,
  loading: storeState.childrenGroup.loading,
  updating: storeState.childrenGroup.updating,
  updateSuccess: storeState.childrenGroup.updateSuccess
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
)(ChildrenGroupUpdate);
