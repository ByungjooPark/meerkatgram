import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import Router from './routes/Router.jsx';
import store from './store/store.js';
import { injectStroe } from './configs/axiosConfig.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router />
  </Provider>
);

injectStroe(store);