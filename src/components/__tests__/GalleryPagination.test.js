import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import GalleryPagination from '../GalleryPagination';
import state from '../../config/mockState';
import store from '../../config/mockStore';
import { SEARCH_FETCH_REQUEST } from '../../actions';

describe('GalleryPagination component', () => {
  const { search } = state;
  const { text, pageSelected } = search;

  const component = (
    <Provider store={store}>
      <GalleryPagination />
    </Provider>
  );

  beforeEach(() => {
    store.clearActions();
  });

  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(component, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Snapshot matchs', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Click on previous button', () => {
    const tree = TestUtils.renderIntoDocument(component);
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(tree, 'button');
    const previousButton = buttons[0];

    //Call the function
    TestUtils.Simulate.click(previousButton);

    const expectedActions = [
      {
        type: SEARCH_FETCH_REQUEST,
        payload: {
          meta: {
            text,
            page: pageSelected - 1,
          },
        },
      },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Click on next button', () => {
    const tree = TestUtils.renderIntoDocument(component);
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(tree, 'button');
    const nextButton = buttons[1];

    //Call the function
    TestUtils.Simulate.click(nextButton);

    const expectedActions = [
      {
        type: SEARCH_FETCH_REQUEST,
        payload: {
          meta: {
            text,
            page: pageSelected + 1,
          },
        },
      },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
