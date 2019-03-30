import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MessageUser from './message-user';
import MessageUserDetail from './message-user-detail';
import MessageUserUpdate from './message-user-update';
import MessageUserDeleteDialog from './message-user-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MessageUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MessageUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MessageUserDetail} />
      <ErrorBoundaryRoute path={match.url} component={MessageUser} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MessageUserDeleteDialog} />
  </>
);

export default Routes;
