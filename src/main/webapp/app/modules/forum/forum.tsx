import './forum.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Alert, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

import { getSession } from 'app/shared/reducers/authentication';

export interface IForumProp extends StateProps, DispatchProps {}

export class Forum extends React.Component<IForumProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    return (
      <Row>
        <div className="wrapper">
          <table className="topic-list ember-view" id="ember35">
            <thead>
              <tr>
                <th className="default" data-sort-order="default">
                  FORUM
                </th>

                <th className="posters" data-sort-order="posters" />

                <th className="posts sortable num" data-sort-order="posts">
                  Réponses
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="topic-list-item category-reactjs has-excerpt pinned ember-view" data-topic-id="81" id="ember38">
                <td className="main-link clearfix" colSpan={1}>
                  <span className="link-top-line">
                    <a className="title raw-link raw-topic-link" data-topic-id="81" href="/t/about-the-reactjs-category/81">
                      La propreté
                    </a>
                    <span className="topic-post-badges" />
                  </span>
                  <div className="link-bottom-line" />
                </td>

                <td className="posters">
                  <a className="latest single" data-user-card="justin" href="/u/justin">
                    <img
                      alt=""
                      className="avatar latest single"
                      height="25"
                      src="/user_avatar/forum.shakacode.com/justin/50/834_2.png"
                      title="Justin Gordon - Original Poster, Most Recent Poster"
                      width="25"
                    />
                  </a>
                </td>
                <td className="num posts-map posts heatmap-" title="This topic has 0 replies">
                  <a className="posts-map badge-posts heatmap-" href="">
                    <span className="number">0</span>
                  </a>
                </td>
              </tr>

              <tr className="topic-list-item category-reactjs ember-view" data-topic-id="1558" id="ember40">
                <td className="main-link clearfix" colSpan={1}>
                  <span className="link-top-line">
                    <a className="title raw-link raw-topic-link" data-topic-id="1558" href="/t/react-rails-with-redux-persist-gate/1558">
                      L'anxiété chez les enfants
                    </a>
                    <span className="topic-post-badges" />
                  </span>
                  <div className="link-bottom-line" />
                </td>

                <td className="posters">
                  <a className="latest single" data-user-card="gyto" href="/u/gyto">
                    <img
                      alt=""
                      className="avatar latest single"
                      height="25"
                      src="/user_avatar/forum.shakacode.com/gyto/50/918_2.png"
                      title="Roman K - Original Poster, Most Recent Poster"
                      width="25"
                    />
                  </a>
                </td>
                <td className="num posts-map posts heatmap-" title="This topic has 0 replies">
                  <a className="posts-map badge-posts heatmap-" href="">
                    <span className="number">0</span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
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
)(Forum);
