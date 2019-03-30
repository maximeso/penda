import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './observation.reducer';
import { IObservation } from 'app/shared/model/observation.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IObservationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ObservationDetail extends React.Component<IObservationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { observationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pendaApp.observation.detail.title">Observation</Translate> [<b>{observationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="createdDate">
                <Translate contentKey="pendaApp.observation.createdDate">Created Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={observationEntity.createdDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="description">
                <Translate contentKey="pendaApp.observation.description">Description</Translate>
              </span>
            </dt>
            <dd>{observationEntity.description}</dd>
            <dt>
              <Translate contentKey="pendaApp.observation.creator">Creator</Translate>
            </dt>
            <dd>{observationEntity.creator ? observationEntity.creator.email : ''}</dd>
            <dt>
              <Translate contentKey="pendaApp.observation.children">Children</Translate>
            </dt>
            <dd>{observationEntity.children ? observationEntity.children.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/observation" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/observation/${observationEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ observation }: IRootState) => ({
  observationEntity: observation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObservationDetail);
