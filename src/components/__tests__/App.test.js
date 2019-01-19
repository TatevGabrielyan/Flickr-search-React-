import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mockComponent } from '../../utils/testUtils';

import App from '../App';

jest.mock('../Gallery', () => {
  return props => mockComponent('Gallery', props);
});

jest.mock('../Search', () => {
  return props => mockComponent('Search', props);
});

jest.mock('../Title', () => {
  return props => mockComponent('Title', props);
});

jest.mock('../Detail', () => {
  return props => mockComponent('Detail', props);
});
jest.mock('../DragAndDrop', ()=>{
  return props=> mockComponent('DragAndDrop', props)
})

describe('App component', () => {
  const component = <App />;

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
