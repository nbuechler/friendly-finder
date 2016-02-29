import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { App } from 'containers/App/App';
import { Home } from 'containers/Home/Home';
import { List } from 'containers/List/List';
import { Find } from 'containers/Find/Find';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="list" component={List} />
    <Route path="find" component={Find} />
    <Route status={404} path="*" component={Home} />
  </Route>
);
