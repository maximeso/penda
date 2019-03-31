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
                  Forum
                </th>

                <th className="posters" data-sort-order="posters" />

                <th className="posts sortable num" data-sort-order="posts">
                  Replies
                </th>

                <th className="views sortable num" data-sort-order="views">
                  Views
                </th>

                <th className="activity sortable num" data-sort-order="activity">
                  Activity
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="topic-list-item category-reactjs has-excerpt pinned ember-view" data-topic-id="81" id="ember38">
                <td className="main-link clearfix" colSpan={1}>
                  <span className="link-top-line">
                    <a className="title raw-link raw-topic-link" data-topic-id="81" href="/t/about-the-reactjs-category/81">
                      About the ReactJS category
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
                <td className="num views heatmap-low">
                  <span className="number" title="this topic has been viewed 1,021 times">
                    1.0k
                  </span>
                </td>

                <td
                  className="num age coldmap-high activity"
                  title="First post: Sep 30, 2014 5:02 pm
Posted: Jan 30, 2017 7:21 am"
                >
                  <a className="post-activity" href="/t/about-the-reactjs-category/81/1">
                    <span className="relative-date with-year" data-format="tiny" data-time="1485778907534">
                      Jan '17
                    </span>
                  </a>
                </td>
              </tr>

              <tr className="topic-list-item category-reactjs ember-view" data-topic-id="1558" id="ember40">
                <td className="main-link clearfix" colSpan={1}>
                  <span className="link-top-line">
                    <a className="title raw-link raw-topic-link" data-topic-id="1558" href="/t/react-rails-with-redux-persist-gate/1558">
                      React + Rails with Redux Persist Gate
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
                <td className="num views ">
                  <span className="number" title="this topic has been viewed 14 times">
                    14
                  </span>
                </td>

                <td
                  className="num age activity"
                  title="First post: Mar 20, 2019 10:55 pm
Posted: Mar 20, 2019 10:55 pm"
                >
                  <a className="post-activity" href="/t/react-rails-with-redux-persist-gate/1558/1">
                    <span className="relative-date" data-format="tiny" data-time="1553136955759">
                      10d
                    </span>
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
