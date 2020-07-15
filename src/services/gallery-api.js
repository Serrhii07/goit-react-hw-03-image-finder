import axios from 'axios';
const key = '16241946-e1ddd5a0e4c82215e760a7728';

const fetchImages = (searchQuery = '', currentPage = 1) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
};

export default { fetchImages };
