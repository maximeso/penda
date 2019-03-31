import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

import { getSession } from 'app/shared/reducers/authentication';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <Row className="container-homepage">
        <Col md="9">
          <h2 className="title-homepage">
            <Translate contentKey="home.title">Welcome, Java Hipster!</Translate>
          </h2>
          <Row>
            <Col md="4">
              <Link className="link-homepage" to="/new-feed">
                <Card className="card-homepage">
                  <CardImg className="card-img-homepage" src="/content/images/group.png" />
                  <CardBody className="card-body-homepage">
                    <CardTitle className="card-title-homepage">Vie de groupe</CardTitle>
                  </CardBody>
                </Card>
              </Link>
            </Col>
            <Col md="4">
              <Link className="link-homepage" to="/agenda">
                <Card className="card-homepage">
                  <CardImg className="card-img-homepage large" src="/content/images/agenda.png" />
                  <CardBody className="card-body-homepage">
                    <CardTitle className="card-title-homepage">Agenda</CardTitle>
                  </CardBody>
                </Card>
              </Link>
            </Col>
            <Col md="4">
              <Link className="link-homepage" to="/messenger">
                <Card className="card-homepage">
                  <CardImg className="card-img-homepage" src="/content/images/messenger.png" />
                  <CardBody className="card-body-homepage">
                    <CardTitle className="card-title-homepage">Message privée (Éducatrice)</CardTitle>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md="4">
              <Link className="link-homepage" to="/forum">
                <Card className="card-homepage">
                  <CardImg className="card-img-homepage large" src="/content/images/forum.png" />
                  <CardBody className="card-body-homepage">
                    <CardTitle className="card-title-homepage">Forum Parent</CardTitle>
                  </CardBody>
                </Card>
              </Link>
            </Col>
            <Col md="4">
              <Link className="link-homepage" to="/appointment">
                <Card className="card-homepage">
                  <CardImg className="card-img-homepage" src="/content/images/appointment.png" />
                  <CardBody className="card-body-homepage">
                    <CardTitle className="card-title-homepage">Réunion et Sortie</CardTitle>
                  </CardBody>
                </Card>
              </Link>
            </Col>
            <Col md="4">
              <Link className="link-homepage" to="/recipe">
                <Card className="card-homepage">
                  <CardImg className="card-img-homepage" src="/content/images/recipe.png" />
                  <CardBody className="card-body-homepage">
                    <CardTitle className="card-title-homepage">Recette</CardTitle>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col md="3" className="pad img-homepage">
          <span className="hipster rounded" />
        </Col>
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
)(Home);
