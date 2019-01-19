import {
  SEARCH_FETCH_REQUEST,
  SEARCH_FETCH_SUCCESS,
  SEARCH_FETCH_FAILURE,
} from '../../actions';
import reducer, {
  getSearchIsLoading,
  getSearchStat,
  getSearchPhotos,
  getSearchText,
  getSearchPageSelected,
  getSearchNumberOfPages,
  getSearchLargePhotos,
} from '../search';

import mockFlickrPhotosSearch from '../__mocks__/flickr.photos.search.json';
const { photos, stat } = mockFlickrPhotosSearch;

describe('Search Reducer', () => {
  const text = 'cats';

  it('Default value', () => {
    const action = {};
    const initialState = undefined;
    const expectedState = {
      isLoading: false,
      pageSelected: null,
      photos: {},
      stat: null,
      text: null,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('Action: SEARCH_FETCH_REQUEST', () => {
    const action = {
      type: SEARCH_FETCH_REQUEST,
    };
    const initialState = {
      isLoading: false,
      pageSelected: null,
      photos: {},
      stat: null,
      text: null,
    };
    const expectedState = {
      isLoading: true,
      pageSelected: null,
      photos: {},
      stat: null,
      text: null,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('Action: SEARCH_FETCH_SUCCESS', () => {
    const action = {
      type: SEARCH_FETCH_SUCCESS,
      payload: {
        response: {
          data: {
            photos: photos,
            stat,
          },
        },
        meta: {
          text,
          page: 1,
        },
      },
    };
    const initialState = {
      isLoading: false,
      pageSelected: null,
      photos: {},
      stat: null,
      text: null,
    };
    const expectedState = {
      isLoading: false,
      pageSelected: 1,
      photos,
      stat,
      text,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('Action: SEARCH_FETCH_SUCCESS (no data)', () => {
    const action = {
      type: SEARCH_FETCH_SUCCESS,
      payload: {
        response: {
          data: null,
        },
        meta: {
          text,
          page: 1,
        },
      },
    };
    const initialState = {
      isLoading: false,
      pageSelected: 1,
      photos,
      stat,
      text,
    };
    const expectedState = {
      isLoading: false,
      pageSelected: null,
      photos: {},
      stat: null,
      text: null,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('Action: SEARCH_FETCH_FAILURE', () => {
    const action = {
      type: SEARCH_FETCH_FAILURE,
    };
    const initialState = {
      isLoading: false,
      pageSelected: 1,
      photos,
      stat,
      text,
    };
    const expectedState = {
      isLoading: false,
      pageSelected: null,
      photos: {},
      stat: null,
      text: null,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  describe('Selectors:', () => {
    it('getSearchIsLoading:', () => {
      const isLoading = false;
      const state = {
        isLoading,
      };
      expect(getSearchIsLoading(state)).toEqual(isLoading);
    });

    it('getSearchStat:', () => {
      const stat = 'ok';
      const state = {
        stat,
      };
      expect(getSearchStat(state)).toEqual(stat);
    });

    describe('getSearchPhotos:', () => {
      it('No state.photos:', () => {
        const state = {};
        expect(getSearchPhotos(state)).toEqual([]);
      });

      it('No state.photos.photo:', () => {
        const state = {
          photos: null,
        };
        expect(getSearchPhotos(state)).toEqual([]);
      });

      it('Success case:', () => {
        const state = {
          photos: {
            photo: [photos.photo[0], photos.photo[1]],
          },
        };
        const expectedResult = [
          {
            id: '44741364214',
            owner: '155132944@N06',
            ownername: 'patchmonkeys',
            title: 'Großes Bügelbild GANGSTA CAT, Print Patch zum aufbügeln',
            url_m:
              'https://farm2.staticflickr.com/1927/44741364214_0f0a5195e9_b.jpg',
            url_q:
              'https://farm2.staticflickr.com/1927/44741364214_0f0a5195e9_q.jpg',
          },
          {
            id: '45414777002',
            owner: '158309862@N07',
            ownername: 'sivappa.technology',
            title: 'that is a huge cat',
            url_m:
              'https://farm2.staticflickr.com/1956/45414777002_21af9f1855_b.jpg',
            url_q:
              'https://farm2.staticflickr.com/1956/45414777002_21af9f1855_q.jpg',
          },
        ];
        expect(getSearchPhotos(state)).toEqual(expectedResult);
      });
    });

    it('getSearchText:', () => {
      const state = {
        text,
      };
      expect(getSearchText(state)).toEqual(text);
    });

    it('getSearchPageSelected:', () => {
      const pageSelected = 1;
      const state = {
        pageSelected,
      };
      expect(getSearchPageSelected(state)).toEqual(pageSelected);
    });

    describe('getSearchNumberOfPages:', () => {
      it('No state.photos:', () => {
        const state = {};
        expect(getSearchNumberOfPages(state)).toEqual(null);
      });

      it('Success case:', () => {
        const pages = 8514;
        const state = {
          photos: {
            pages,
          },
        };
        const expectedResult = pages;
        expect(getSearchNumberOfPages(state)).toEqual(expectedResult);
      });
    });
  });

  describe('getSearchLargePhotos:', () => {
    it('No state.photos:', () => {
      const state = {};
      expect(getSearchLargePhotos(state)).toEqual([]);
    });

    it('No state.photos.photo:', () => {
      const state = {
        photos: null,
      };
      expect(getSearchLargePhotos(state)).toEqual([]);
    });

    it('Success case:', () => {
      const state = {
        photos: {
          photo: [photos.photo[0], photos.photo[1]],
        },
      };
      const expectedResult = [
        {
          id: '44741364214',
          owner: '155132944@N06',
          ownername: 'patchmonkeys',
          title: 'Großes Bügelbild GANGSTA CAT, Print Patch zum aufbügeln',
          url_c: undefined,
          url_l: undefined,
          url_m:
            'https://farm2.staticflickr.com/1927/44741364214_0f0a5195e9_b.jpg',
          url_n: undefined,
          url_o: undefined,
          url_q:
            'https://farm2.staticflickr.com/1927/44741364214_0f0a5195e9_q.jpg',
          url_z: undefined,
        },
        {
          id: '45414777002',
          owner: '158309862@N07',
          ownername: 'sivappa.technology',
          title: 'that is a huge cat',
          url_c: undefined,
          url_l: undefined,
          url_m:
            'https://farm2.staticflickr.com/1956/45414777002_21af9f1855_b.jpg',
          url_n: undefined,
          url_o: undefined,
          url_q:
            'https://farm2.staticflickr.com/1956/45414777002_21af9f1855_q.jpg',
          url_z: undefined,
        },
      ];

      expect(getSearchLargePhotos(state)).toEqual(expectedResult);
    });
  });
});
