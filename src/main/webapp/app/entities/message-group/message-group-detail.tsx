import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './message-group.reducer';
import { IMessageGroup } from 'app/shared/model/message-group.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMessageGroupDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MessageGroupDetail extends React.Component<IMessageGroupDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { messageGroupEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pendaApp.messageGroup.detail.title">MessageGroup</Translate> [<b>{messageGroupEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="createdDate">
                <Translate contentKey="pendaApp.messageGroup.createdDate">Created Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={messageGroupEntity.createdDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="message">
                <Translate contentKey="pendaApp.messageGroup.message">Message</Translate>
              </span>
            </dt>
            <dd>{messageGroupEntity.message}</dd>
            <dt>
              <Translate contentKey="pendaApp.messageGroup.creator">Creator</Translate>
            </dt>
            <dd>{messageGroupEntity.creator ? messageGroupEntity.creator.email : ''}</dd>
            <dt>
              <Translate contentKey="pendaApp.messageGroup.childrenGroup">Children Group</Translate>
            </dt>
            <dd>{messageGroupEntity.childrenGroup ? messageGroupEntity.childrenGroup.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/message-group" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/message-group/${messageGroupEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ messageGroup }: IRootState) => ({
  messageGroupEntity: messageGroup.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageGroupDetail);
