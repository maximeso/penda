import './recipe.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Alert, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

import { getSession } from 'app/shared/reducers/authentication';

export interface IRecipeProp extends StateProps, DispatchProps {}

export class Recipe extends React.Component<IRecipeProp> {
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
                <th className="posters" data-sort-order="posters" />

                <th className="default" data-sort-order="default">
                  Recette
                </th>

                <th className="posts sortable num" data-sort-order="posts">
                  Replies
                </th>

                <th className="views sortable num" data-sort-order="views">
                  Views
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="topic-list-item category-reactjs has-excerpt pinned ember-view" data-topic-id="81" id="ember38">
                <td className="posters">
                  <img
                    alt=""
                    className="avatar latest single"
                    src="https://images.ricardocuisine.com/services/recipes/500x675_2009.jpg"
                    width="50"
                  />
                </td>

                <td className="main-link clearfix" colSpan={1}>
                  <span className="link-top-line">
                    <a className="title raw-link raw-topic-link" data-topic-id="81" href="/t/about-the-reactjs-category/81">
                      Hummus (trempette de pois chiches)
                    </a>
                    <span className="topic-post-badges" />
                  </span>
                  <div className="link-bottom-line" />
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
)(Recipe);
