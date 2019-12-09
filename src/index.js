import '@babel/polyfill';
import dva from 'dva';
import { createHashHistory } from 'history';

const app = dva({
    history: createHashHistory(),
    onError(error) {
        console.log(error);
    },
});

app.model(require('./models/app').default);
app.router(require('./router').default);
app.start('#root');
