import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ChildrenGroup from './children-group';
import ChildrenGroupDetail from './children-group-detail';
import ChildrenGroupUpdate from './children-group-update';
import ChildrenGroupDeleteDialog from './children-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChildrenGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChildrenGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChildrenGroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={ChildrenGroup} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ChildrenGroupDeleteDialog} />
  </>
);

export default Routes;
