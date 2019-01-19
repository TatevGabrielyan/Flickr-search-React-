import React, { Fragment, PureComponent } from 'react';
import { Provider } from 'react-redux';

import configureStore from '../config/store';
import Title from './Title';
import Search from './Search';
import Gallery from './Gallery';
import Detail from './Detail';
const store = configureStore();

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Title />
          <Search />
          <Gallery />
          <Detail />
        </Fragment>
      </Provider>
    );
  }
}

export default App;

