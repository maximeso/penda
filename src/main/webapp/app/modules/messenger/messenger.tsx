import './messenger.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Alert, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

import { getSession } from 'app/shared/reducers/authentication';
import { faMicrophone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface INewFeedProp extends StateProps, DispatchProps {}

export class Messenger extends React.Component<INewFeedProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <div className="message-list">
          <div className="toolbar">
            <h1 className="toolbar-title">Éducatrice</h1>
            <div className="right-items">
              <i className="toolbar-button ion-ios-information-circle-outline" />
              <i className="toolbar-button ion-ios-videocam" />
              <i className="toolbar-button ion-ios-call" />
            </div>
          </div>
          <div className="message-list-container">
            <div className="message mine start end">
              <div className="timestamp">Lundi le 1 avril, 2019 7:46 AM</div>
              <div className="bubble-container">
                <div className="bubble" title="Saturday, March 30, 2019 3:46 PM">
                  Bonjour,
                  <br />
                  Je vous avise que Milan ne viendra pas au CPE aujourd'hui.
                  <br />
                  Merci
                </div>
              </div>
            </div>
            <div className="message  start end">
              <div className="bubble-container">
                <div className="bubble" title="Saturday, March 30, 2019 3:46 PM">
                  Bonjour, je vous remercie de m'aviser.
                  <br />
                  Bonne journée.
                </div>
              </div>
            </div>
            <div className="message mine start end">
              <div className="bubble-container">
                <div className="bubble" title="Saturday, March 30, 2019 3:46 PM">
                  Bienvenu. Excellente journée à vous.
                </div>
              </div>
            </div>
          </div>
          <div className="compose">
            <input type="text" className="compose-input" placeholder="Entrez votre message" />
            <FontAwesomeIcon icon={faMicrophone} className="icon-compose" />
            <FontAwesomeIcon icon={faPaperPlane} className="icon-compose" />
          </div>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messenger);
