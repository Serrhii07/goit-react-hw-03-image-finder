import React, { Component } from 'react';
import Searchbar from '../Searchbar';
import SearchForm from '../SearchForm';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Spinner from '../Spinner';
import Modal from '../Modal';
import galleryApi from '../../services/gallery-api';
import styles from './App.module.css';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    selectedImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      images: [],
      currentPage: 1,
      error: null,
    });
  };

  fetchImages = () => {
    const { searchQuery, currentPage } = this.state;

    this.setState({ isLoading: true });

    galleryApi
      .fetchImages(searchQuery, currentPage)
      .then(hits => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
        }));

        this.scrollPage();
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onOpenModal = largeImageURL => {
    this.setState({ showModal: true, selectedImage: largeImageURL });
  };

  onCloseModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  scrollPage = () => {
    if (this.state.images.length > 12) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  render() {
    const { images, isLoading, error, showModal, selectedImage } = this.state;
    const shouldRenderLoadMoreBtn = images.length > 0 && !isLoading;

    return (
      <div className={styles.app}>
        <Searchbar>
          <SearchForm onSubmit={this.onChangeQuery} />
        </Searchbar>

        {error && <h1>Oops!!! Something went wrong :(</h1>}

        <ImageGallery images={images} onClick={this.onOpenModal} />

        {isLoading && <Spinner />}

        {shouldRenderLoadMoreBtn && <Button onClick={this.fetchImages} />}

        {showModal && (
          <Modal onClick={this.onCloseModal}>
            <img src={selectedImage} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
