import React from 'react';
import { Route, Switch, routerRedux } from 'dva/router';
import './assets/theme.less';
import Page from './routes/page';
const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history} >
      <Switch>
        <Route path="/" exact component={Page} />
      </Switch>
    </ConnectedRouter>
  )
}

export default RouterConfig
