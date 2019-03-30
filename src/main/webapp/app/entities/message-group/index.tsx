import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MessageGroup from './message-group';
import MessageGroupDetail from './message-group-detail';
import MessageGroupUpdate from './message-group-update';
import MessageGroupDeleteDialog from './message-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MessageGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MessageGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MessageGroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={MessageGroup} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MessageGroupDeleteDialog} />
  </>
);

export default Routes;
