import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onClick }) => (
  <ul className={styles.image_gallery}>
    {images.map(({ id, webformatURL, largeImageURL, tags }) => (
      <li
        className={styles.image_gallery_item}
        key={id}
        onClick={() => onClick(largeImageURL)}
      >
        <ImageGalleryItem smallImgURL={webformatURL} tag={tags} />
      </li>
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
