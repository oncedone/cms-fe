import React from 'react';
import { Route, Switch, routerRedux } from 'dva/router';
import './assets/theme.less';

import XLayout from './components/Layout';
import Page from './routes/page';
import Edit from './routes/edit';
import List from './routes/list';

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history} >
      <XLayout>
        <Switch>
          <Route path="/" exact component={Page} />
          <Route path="/list" exact component={List} />
          <Route path="/edit" exact component={Edit} />
        </Switch>
      </XLayout>
    </ConnectedRouter>
  )
}

export default RouterConfig
