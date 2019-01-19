import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { mockComponent } from '../../utils/testUtils';

import Detail from '../Detail';
import store from '../../config/mockStore';

jest.mock('react-image-lightbox', () => {
  return props => mockComponent('Lightbox', props);
});

describe('Detail component', () => {
  const component = (
    <Provider store={store}>
      <Detail />
    </Provider>
  );
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(component, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Snapshot matchs', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
