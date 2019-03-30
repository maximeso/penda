import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './recipe.reducer';
import { IRecipe } from 'app/shared/model/recipe.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecipeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RecipeDetail extends React.Component<IRecipeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { recipeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pendaApp.recipe.detail.title">Recipe</Translate> [<b>{recipeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="pendaApp.recipe.name">Name</Translate>
              </span>
            </dt>
            <dd>{recipeEntity.name}</dd>
            <dt>
              <span id="created">
                <Translate contentKey="pendaApp.recipe.created">Created</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={recipeEntity.created} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="description">
                <Translate contentKey="pendaApp.recipe.description">Description</Translate>
              </span>
            </dt>
            <dd>{recipeEntity.description}</dd>
            <dt>
              <span id="actived">
                <Translate contentKey="pendaApp.recipe.actived">Actived</Translate>
              </span>
            </dt>
            <dd>{recipeEntity.actived ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="pendaApp.recipe.creator">Creator</Translate>
            </dt>
            <dd>{recipeEntity.creator ? recipeEntity.creator.email : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/recipe" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/recipe/${recipeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ recipe }: IRootState) => ({
  recipeEntity: recipe.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDetail);
