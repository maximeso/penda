import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Children from './children';
import Observation from './observation';
import MessageGroup from './message-group';
import MessageUser from './message-user';
import ChildrenGroup from './children-group';
import EventGroup from './event-group';
import Recipe from './recipe';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/children`} component={Children} />
      <ErrorBoundaryRoute path={`${match.url}/observation`} component={Observation} />
      <ErrorBoundaryRoute path={`${match.url}/message-group`} component={MessageGroup} />
      <ErrorBoundaryRoute path={`${match.url}/message-user`} component={MessageUser} />
      <ErrorBoundaryRoute path={`${match.url}/children-group`} component={ChildrenGroup} />
      <ErrorBoundaryRoute path={`${match.url}/event-group`} component={EventGroup} />
      <ErrorBoundaryRoute path={`${match.url}/recipe`} component={Recipe} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
