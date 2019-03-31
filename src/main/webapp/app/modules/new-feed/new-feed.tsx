import './new-feed.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface INewFeedProp extends StateProps, DispatchProps {}

export class NewFeed extends React.Component<INewFeedProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <div className="app-feed-wrapper">
          <div className="app-feed-item">
            <h2 className="app-feed-item-title">
              <span className="app-feed-item-link">Aujourd'hui, activité de peinture avec les mains !</span>
            </h2>
            <p className="app-feed-item-summary">On développe la créativité des enfants tout en s’amusant avec de la peinture.</p>
            <a href="/react-newsfeed/articles/1">
              <img
                className="app-feed-item-img"
                src="https://www.lecourrierdusud.ca/wp-content/uploads/2018/11/3garderie177123027.jpg"
                alt="Article description"
              />
            </a>
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
)(NewFeed);
