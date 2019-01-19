import { DETAIL_SET_ID, DETAIL_RESET } from '../../actions';
import reducer from '../detail';

describe('Search Reducer', () => {
  const id = '123456789';

  it('Default value', () => {
    const action = {};
    const initialState = undefined;
    const expectedState = {
      id: null,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('Action: DETAIL_SET_ID', () => {
    const action = {
      type: DETAIL_SET_ID,
      payload: {
        id,
      },
    };
    const initialState = {
      id: null,
    };
    const expectedState = {
      id,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('Action: DETAIL_RESET', () => {
    const action = {
      type: DETAIL_RESET,
    };
    const initialState = {
      id,
    };
    const expectedState = {
      id: null,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
