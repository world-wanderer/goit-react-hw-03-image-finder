import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ description, smallImage, largeImage, openModal }) {
  return (
    <li className={css.item} onClick={openModal}>
      <img
        className={css.item_gallery}
        src={smallImage}
        alt={description}
        data-large={largeImage}
      />
    </li>
  );
}

ImageGalleryItem.prototype = {
  description: PropTypes.string,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
