// import React, { Component } from 'react';
// import Searchbar from 'components/Searchbar/Searchbar';
// import ImageGallery from 'components/ImageGallery/ImageGallery';
// import Button from 'components/Button/Button';
// import Loader from 'components/Loader/Loader';
// import { fetchImages } from 'components/fetchImages/fetchImages';
// import Notiflix from 'notiflix';

// let page = 1;
// class App extends Component {
//   state = {
//     searchName: '',
//     items: [],
//     status: 'idle',
//     totalHits: 0,
//   };

//   handleSearchbarFormSubmit = async searchName => {
//     page = 1;
//     if (searchName.trim() === '') {
//       Notiflix.Notify.info('You cannot search, try again later...');
//       return;
//     } else {
//       try {
//         this.setState({ status: 'pending' });
//         const { totalHits, hits } = await fetchImages(searchName, page);
//         if (hits.length < 1) {
//           this.setState({ status: 'idle' });
//           Notiflix.Notify.failure('Something wrong(((((');
//         } else {
//           this.setState({
//             items: hits,
//             searchName,
//             totalHits: totalHits,
//             status: 'resolved',
//           });
//         }
//       } catch (error) {
//         this.setState({ status: 'rejected' });
//       }
//     }
//   };

//   handleNextPage = async () => {
//     this.setState({ status: 'pending' });

//     try {
//       const { hits } = await fetchImages(this.state.searchName, (page += 1));
//       this.setState(prevState => ({
//         items: [...prevState.items, ...hits],
//         status: 'resolved',
//         page: prevState.page + 1,
//       }));
//     } catch (error) {
//       this.setState({ status: 'rejected' });
//     }
//   };

//   render() {
//     const { items, totalHits, status } = this.state;
//     if (status === 'idle') {
//       return (
//         <div>
//           <Searchbar onSubmit={this.handleSearchbarFormSubmit} />
//         </div>
//       );
//     }

//     if (status === 'pending') {
//       return (
//         <div>
//           <Searchbar onSubmit={this.handleSearchbarFormSubmit} />
//           <ImageGallery page={page} items={items} />
//           <Loader />
//           {totalHits > 12 && <Button onCLick={this.handleNextPage} />}
//         </div>
//       );
//     }

//     if (status === 'rejected') {
//       return (
//         <div>
//           <Searchbar onSubmit={this.handleSearchbarFormSubmit} />
//           <p>Error!!!!! Error!!! Error!!!</p>
//         </div>
//       );
//     }

//     if (status === 'resolved') {
//       return (
//         <div>
//           <Searchbar onSubmit={this.handleSearchbarFormSubmit} />
//           <ImageGallery page={page} items={items} />
//           {totalHits > 12 && totalHits > items.length && (
//             <Button onCLick={this.handleNextPage} />
//           )}
//         </div>
//       );
//     }
//   }
// }

// export default App;

// ===========================================================

import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    query: '',
    images: [],
    isloading: false,
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isloading: true });
      fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=35059949-3e059907e90d446f04b9db9ab&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => response.json())
        .then(data =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          }))
        )
        .finally(() => this.setState({ isloading: false }));
    }
  }

  handleFormSubmit = query => {
    this.setState({
      page: 1,
      images: [],
      query,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.isloading && <Loader />}
        {this.state.images && <ImageGallery images={this.state.images} />}
        {this.state.images.length > 0 && <Button loadMore={this.loadMore} />}
      </>
    );
  }
}
