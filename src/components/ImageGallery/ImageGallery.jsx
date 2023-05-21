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
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

function ImageGallery({ images, openModal }) {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, description, smallImage, largeImage }) => (
        <ImageGalleryItem
          key={id}
          description={description}
          smallImage={smallImage}
          largeImage={largeImage}
          openModal={openModal}
        />
      ))}
    </ul>
  );
}

ImageGallery.prototype = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string,
      smallImage: PropTypes.string.isRequired,
      largeImage: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
