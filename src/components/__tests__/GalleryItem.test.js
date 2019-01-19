import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import renderer from 'react-test-renderer';

import GalleryItem from '../GalleryItem';

describe('GalleryItem component', () => {
  const id = '123456789';
  const title = 'This is a title!';
  const url_q =
    'https://farm2.staticflickr.com/1943/43652580650_283f870b06_q.jpg';
  const setIdDetail = jest.fn();
  const component = (
    <GalleryItem
      id={id}
      title={title}
      url_q={url_q}
      setIdDetail={setIdDetail}
    />
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

  it('Click on immage', () => {
    const tree = TestUtils.renderIntoDocument(component);
    const image = TestUtils.findRenderedDOMComponentWithTag(tree, 'img');
    TestUtils.Simulate.click(image);
    expect(setIdDetail).toHaveBeenCalled();
    expect(setIdDetail).toHaveBeenCalledTimes(1);
    expect(setIdDetail).toBeCalledWith(id);
  });
});
