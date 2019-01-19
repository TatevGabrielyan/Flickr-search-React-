import { SEARCH_FETCH_REQUEST, SEARCH_FETCH_SUCCESS } from '../index';

import { fetchSearch, setIdDetail, resetDetail, doFetch } from '../index';

describe('Action creators: ', () => {
  describe('fetchSearch', () => {
    it('without page parameter', async () => {
      // prepare
      const text = 'Kitties';
      const page = 1;
      const expected = [
        {
          type: SEARCH_FETCH_REQUEST,
          payload: { meta: { text, page } },
        },
        {
          type: SEARCH_FETCH_SUCCESS,
          payload: { meta: { text, page }, response: {} },
        },
      ];

      // mock the dispatch and getState functions from Redux thunk.
      const dispatch = jest.fn();
      const getState = jest.fn(() => {});

      // execute
      await fetchSearch(text)(dispatch, getState);

      // verify
      expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
      expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);
    });

    it('with page parameter', async () => {
      // prepare
      const text = 'Kitties';
      const page = 2;
      const expected = [
        {
          type: SEARCH_FETCH_REQUEST,
          payload: { meta: { text, page } },
        },
        {
          type: SEARCH_FETCH_SUCCESS,
          payload: { meta: { text, page }, response: {} },
        },
      ];

      // mock the dispatch and getState functions from Redux thunk.
      const dispatch = jest.fn();
      const getState = jest.fn(() => {});

      // execute
      await fetchSearch(text, page)(dispatch, getState);

      // verify
      expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
      expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);
    });
  });

  it('setIdDetail', () => {
    const id = 123;
    const expected = {
      type: 'DETAIL@SET_ID',
      payload: {
        id: 123,
      },
    };
    expect(setIdDetail(id)).toEqual(expected);
  });

  it('resetDetail', () => {
    const expected = {
      type: 'DETAIL@RESET',
    };
    expect(resetDetail()).toEqual(expected);
  });
});

describe('Auxiliar functions of actions creators: ', () => {
  it('doFetch', async () => {
    // prepare
    const type = 'MY_TYPE';
    const url = 'http://myUrl:1234';
    const expected = [
      {
        type: type + '/REQUEST',
        payload: {
          meta: {},
        },
      },
      {
        type: type + '/SUCCESS',
        payload: {
          meta: {},
          response: {},
        },
      },
    ];

    // mock the dispatch and getState functions from Redux thunk.
    const dispatch = jest.fn();
    const getState = jest.fn(() => {
      return {};
    });

    // execute
    await doFetch(type, url)(dispatch, getState);

    // verify
    expect(dispatch.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expected[1]);
  });
});
