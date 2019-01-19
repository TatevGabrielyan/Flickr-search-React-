import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Gallery.css';

import GalleryPagination from './GalleryPagination';
import GalleryItem from './GalleryItem';

import { setIdDetail } from '../actions';
import {
  getSearchIsLoading,
  getSearchPhotos,
  getSearchStat,
} from '../reducers';

class Gallery extends PureComponent {
  getGalleryItems = () => {
    const { photos, setIdDetail } = this.props;
    photos.length=5;
    if (!photos && !photos.lenght) return null;
    return photos.map(item => {
      const { id, title, url_q } = item;
      return (
        <GalleryItem
          key={id}
          id={id}
          title={title}
          url_q={url_q}
          setIdDetail={setIdDetail}
        />
      );
    });
  };

  render() {
    return (
      <Fragment>
        <GalleryPagination />
        <div className="Gallery">{this.getGalleryItems()}</div>
        <div className="dragAndDrop">
          <button className="animals">cat</button>
          <button className="animals">dog</button>
          <div className="dropDiv"> 
            
          </div>
        </div>
      </Fragment>
    );
  }
}

Gallery.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  photos: PropTypes.array.isRequired,
  stat: PropTypes.string,
  setIdDetail: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    isLoading: getSearchIsLoading(state),
    photos: getSearchPhotos(state),
    stat: getSearchStat(state),
  };
};

export default connect(
  mapStateToProps,
  { setIdDetail }
)(Gallery);
