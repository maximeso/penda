import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EventGroup from './event-group';
import EventGroupDetail from './event-group-detail';
import EventGroupUpdate from './event-group-update';
import EventGroupDeleteDialog from './event-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EventGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EventGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EventGroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={EventGroup} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EventGroupDeleteDialog} />
  </>
);

export default Routes;
