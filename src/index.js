import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import configureStore from './store/configureStore';
import { fetchData, fetchClasses } from './actions';

import CreateStudentPage from './components/CreateStudentPage';
import ClassPage from './components/ClassPage';
import StudentsNoClassPage from './components/StudentsNoClassPage';
import Header from './components/Header';

const store = configureStore();
store.dispatch(fetchData());
store.dispatch(fetchClasses());

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/elever-utan-klass" component={StudentsNoClassPage} />
        <Route path="/lagg-till-elev" component={CreateStudentPage} />
        <Route path="/klass" component={ClassPage} />
        <Route path="/" component={StudentsNoClassPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App/>, document.getElementById('app'))
