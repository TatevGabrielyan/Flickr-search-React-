import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import Search from '../Search';
import store from '../../config/mockStore';
import { SEARCH_FETCH_REQUEST } from '../../actions';

describe('Search component', () => {
  const component = (
    <Provider store={store}>
      <Search />
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

  it('Filling the input with a text and click the button must launch an action', () => {
    const tree = TestUtils.renderIntoDocument(component);
    const input = TestUtils.findRenderedDOMComponentWithTag(tree, 'input');
    const button = TestUtils.findRenderedDOMComponentWithTag(tree, 'button');

    //Call the function
    const text = 'Kitties';
    const page = 1;
    TestUtils.Simulate.change(input, { target: { value: text } });
    TestUtils.Simulate.click(button);

    const expectedActions = [
      {
        type: SEARCH_FETCH_REQUEST,
        payload: {
          meta: {
            text,
            page,
          },
        },
      },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
