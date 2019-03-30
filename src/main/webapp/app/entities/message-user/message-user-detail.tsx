import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './message-user.reducer';
import { IMessageUser } from 'app/shared/model/message-user.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMessageUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MessageUserDetail extends React.Component<IMessageUserDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { messageUserEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pendaApp.messageUser.detail.title">MessageUser</Translate> [<b>{messageUserEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="createdDate">
                <Translate contentKey="pendaApp.messageUser.createdDate">Created Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={messageUserEntity.createdDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="message">
                <Translate contentKey="pendaApp.messageUser.message">Message</Translate>
              </span>
            </dt>
            <dd>{messageUserEntity.message}</dd>
            <dt>
              <Translate contentKey="pendaApp.messageUser.from">From</Translate>
            </dt>
            <dd>{messageUserEntity.from ? messageUserEntity.from.email : ''}</dd>
            <dt>
              <Translate contentKey="pendaApp.messageUser.to">To</Translate>
            </dt>
            <dd>{messageUserEntity.to ? messageUserEntity.to.email : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/message-user" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/message-user/${messageUserEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ messageUser }: IRootState) => ({
  messageUserEntity: messageUser.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageUserDetail);
