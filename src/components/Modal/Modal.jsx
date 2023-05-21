import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { BsXLg } from 'react-icons/bs';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { title, onClose, currentImageUrl, currentImageDescription } =
      this.props;
    return createPortal(
      <div onClick={this.handleClickBackdrop} className={css.overlay}>
        <div className={css.modal}>
          <div className={css.wrapper}>
            {title && <h1 className={css.title}>{title}</h1>}
            <button className={css.button} type="button" onClick={onClose}>
              <BsXLg className={css.icon} />
            </button>
          </div>
          <img
            src={currentImageUrl}
            alt={currentImageDescription}
            loading="lazy"
          />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  currentImageUrl: PropTypes.string,
  currentImageDescription: PropTypes.string,
};

export default Modal;
