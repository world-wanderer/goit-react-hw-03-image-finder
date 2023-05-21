import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    query: '',
  };

  onChangeInput = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  onSubmitForm = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { query } = this.state;

    if (query.trim() === '') {
      Notiflix.Notify.info('Спочатку буквочки введи, потім вже шукай!');
      return;
    }

    onSubmit(query);
    e.target.reset();
  };

  render() {
    const { query } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.onSubmitForm}>
          <button type="submit" className={css.button}>
            <ImSearch size={25} />
          </button>

          <input
            className={css.input}
            type="text"
            placeholder="Search images and photos"
            autoComplete="off"
            autoFocus
            value={query}
            onChange={this.onChangeInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
