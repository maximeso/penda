import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './children.reducer';
import { IChildren } from 'app/shared/model/children.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChildrenDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ChildrenDetail extends React.Component<IChildrenDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { childrenEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pendaApp.children.detail.title">Children</Translate> [<b>{childrenEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="pendaApp.children.name">Name</Translate>
              </span>
            </dt>
            <dd>{childrenEntity.name}</dd>
            <dt>
              <Translate contentKey="pendaApp.children.tutors">Tutors</Translate>
            </dt>
            <dd>
              {childrenEntity.tutors
                ? childrenEntity.tutors.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === childrenEntity.tutors.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}{' '}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/children" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/children/${childrenEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ children }: IRootState) => ({
  childrenEntity: children.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChildrenDetail);
