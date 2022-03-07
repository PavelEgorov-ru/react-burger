import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App/App';
import reportWebVitals from './reportWebVitals';
import {store} from './services/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();


//пока не удалять
// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;
// const enhancer = composeEnhancers(applyMiddleware(thunk));
// const store = createStore(rootReducer, enhancer);


// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
//   devTools: process.env.NODE_ENV !== 'production',
// })