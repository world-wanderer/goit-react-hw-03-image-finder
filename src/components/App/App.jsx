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
import fetchImages from '../../servises/images-api';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

class App extends Component {
  state = {
    query: '',
    page: 1,
    imagesOnPage: 0,
    totalImages: 0,
    isLoading: false,
    showModal: false,
    images: null,
    error: null,
    currentImageUrl: null,
    currentImageDescription: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchImages(query)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState({
            page: 1,
            images: imagesArray,
            imagesOnPage: imagesArray.length,
            totalImages: totalHits,
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }

    if (prevState.page !== page && page !== 1) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchImages(query, page)
        .then(({ hits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState(({ images, imagesOnPage }) => {
            return {
              images: [...images, ...imagesArray],
              imagesOnPage: imagesOnPage + imagesArray.length,
            };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }
  }

  getSearchRequest = query => {
    this.setState({ query });
  };

  onNextFetch = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currentImageDescription: currentImageDescription,
      }));
    }
  };

  render() {
    const {
      images,
      imagesOnPage,
      totalImages,
      isLoading,
      showModal,
      currentImageUrl,
      currentImageDescription,
    } = this.state;

    const getSearchRequest = this.getSearchRequest;
    const onNextFetch = this.onNextFetch;
    const openModal = this.openModal;
    const toggleModal = this.toggleModal;

    return (
      <>
        <Searchbar onSubmit={getSearchRequest} />

        {images && <ImageGallery images={images} openModal={openModal} />}

        {isLoading && <Loader />}

        {imagesOnPage >= 12 && imagesOnPage < totalImages && (
          <Button onNextFetch={onNextFetch} />
        )}

        {showModal && (
          <Modal
            onClose={toggleModal}
            currentImageUrl={currentImageUrl}
            currentImageDescription={currentImageDescription}
          />
        )}
      </>
    );
  }
}

export default App;
