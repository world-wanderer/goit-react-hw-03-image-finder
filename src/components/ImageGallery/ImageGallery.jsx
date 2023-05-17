// import PropTypes from 'prop-types';

// import css from './ImageGallery.module.css';
// import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

// function ImageGallery({ items }) {
//   return (
//     <div>
//       <ul className={css.gallery}>
//         {items.map(item => (
//           <ImageGalleryItem key={item.id} item={item} />
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ImageGallery;

// ImageGallery.propTypes = {
//   items: PropTypes.array,
// };

// ======================================================================

import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export function ImageGallery({ images, onClick }) {
  return (
    <div>
      <ul className={css.gallery}>
        {images.map(({ id, ...otherProps }) => (
          <ImageGalleryItem key={id} {...otherProps} />
        ))}
      </ul>
    </div>
  );
}

ImageGallery.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func,
};
