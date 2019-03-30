import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Children from './children';
import ChildrenDetail from './children-detail';
import ChildrenUpdate from './children-update';
import ChildrenDeleteDialog from './children-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChildrenUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChildrenUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChildrenDetail} />
      <ErrorBoundaryRoute path={match.url} component={Children} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ChildrenDeleteDialog} />
  </>
);

export default Routes;
