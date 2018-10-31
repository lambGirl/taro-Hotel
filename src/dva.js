import { create } from 'dva-core';
import { createLogger } from 'redux-logger'
import createLoading from 'dva-loading';

let app;
let store;
let dispatch;

function createApp(opt){
    opt.onAction = [createLogger()];    //配置Action
    app =  create(opt); //注入配置
    app.use(createLoading({})); //注入loading

    if(!global.registered) opt.models.forEach(model => app.model(model));

    global.registered =  true;
    app.start();

    store =  app._store;
    app.getStore = () => store;

    dispatch =  store.dispatch;
    app.dispatch = dispatch;
    return app;
}


export default {
    createApp,
    getDispatch() {
        return app.dispatch;
    }
}
