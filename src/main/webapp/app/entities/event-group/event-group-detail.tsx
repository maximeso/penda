import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './event-group.reducer';
import { IEventGroup } from 'app/shared/model/event-group.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventGroupDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EventGroupDetail extends React.Component<IEventGroupDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { eventGroupEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pendaApp.eventGroup.detail.title">EventGroup</Translate> [<b>{eventGroupEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="createdDate">
                <Translate contentKey="pendaApp.eventGroup.createdDate">Created Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={eventGroupEntity.createdDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="name">
                <Translate contentKey="pendaApp.eventGroup.name">Name</Translate>
              </span>
            </dt>
            <dd>{eventGroupEntity.name}</dd>
            <dt>
              <Translate contentKey="pendaApp.eventGroup.childrenGroup">Children Group</Translate>
            </dt>
            <dd>{eventGroupEntity.childrenGroup ? eventGroupEntity.childrenGroup.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/event-group" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/event-group/${eventGroupEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ eventGroup }: IRootState) => ({
  eventGroupEntity: eventGroup.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventGroupDetail);
