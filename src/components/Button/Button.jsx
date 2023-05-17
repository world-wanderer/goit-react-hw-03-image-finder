import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ loadMore }) => {
  return (
    <button type="button" className={css.button} onClick={loadMore}>
      Load more...
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
