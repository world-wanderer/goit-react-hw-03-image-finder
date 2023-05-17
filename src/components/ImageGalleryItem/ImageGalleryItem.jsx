import React, { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <li className={css.image_gallery}>
        <img
          onClick={this.toggleModal}
          className={css.image_gallery_item}
          src={this.props.webformatURL}
          alt={this.props.tags}
        />
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            imageUrl={this.props.largeImageURL}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
};
