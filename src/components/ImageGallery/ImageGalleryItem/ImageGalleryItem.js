import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImgURL, tag }) => (
  <img className={styles.image_gallery_item_img} src={smallImgURL} alt={tag} />
);

ImageGalleryItem.propTypes = {
  smallImgURL: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
