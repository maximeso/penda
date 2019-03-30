import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './children-group.reducer';
import { IChildrenGroup } from 'app/shared/model/children-group.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChildrenGroupDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ChildrenGroupDetail extends React.Component<IChildrenGroupDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { childrenGroupEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pendaApp.childrenGroup.detail.title">ChildrenGroup</Translate> [<b>{childrenGroupEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="pendaApp.childrenGroup.name">Name</Translate>
              </span>
            </dt>
            <dd>{childrenGroupEntity.name}</dd>
            <dt>
              <Translate contentKey="pendaApp.childrenGroup.responsable">Responsable</Translate>
            </dt>
            <dd>{childrenGroupEntity.responsable ? childrenGroupEntity.responsable.email : ''}</dd>
            <dt>
              <Translate contentKey="pendaApp.childrenGroup.childrens">Childrens</Translate>
            </dt>
            <dd>
              {childrenGroupEntity.childrens
                ? childrenGroupEntity.childrens.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === childrenGroupEntity.childrens.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/children-group" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/children-group/${childrenGroupEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ childrenGroup }: IRootState) => ({
  childrenGroupEntity: childrenGroup.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChildrenGroupDetail);
