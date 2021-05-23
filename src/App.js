import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import BookThumbnail from './components/BookThumbnail';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      searchItem: "Animal Farm",
      displayMessage: "",
      Loading: false
    }
    this.fetchingBooks = this.fetchingBooks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchingBooks();
  }

  handleChange(e) {
    this.setState({ [e.target.name]:  e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.searchItem) {
      this.setState({searchItem: this.state.searchItem });
      this.fetchingBooks();
    }
  }

  fetchingBooks() {
    const item = this.state.searchItem;
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${item}`)
         .then((response) => {
                  if (response.data.totalItems === 0) {
                    this.setState({
                      list: [],
                      displayMessage: `No books found for ${item}`
                    });
                  } else {
                    this.setState({
                      list: response.data.items,
                      displayMessage: `Your results for ${item}`
                    });
                  }
                }
          );
  }

  render() {
    return (
      <div className="App">
        <h2>Books App</h2>
        <form onClick={this.handleSubmit}>
          <label htmlFor="searchItem">Book Search:</label><br/>
          <input
            id="searchItem"
            name="searchItem"
            type="text"
            value={this.state.searchItem}
            onChange={this.handleChange} />
          <button type="submit">Search</button>
        </form>
        <h4>{this.state.displayMessage}</h4>
        <h4>{this.state.Loading && 'Loading'}</h4>
        <div class="Page"> {this.state.list.map(book => (
                                                          <BookThumbnail 
                                                              key={book.id}
                                                              title={book.volumeInfo.title}
                                                              link={book.volumeInfo.previewLink}
                                                              description={book.volumeInfo.description}
                                                              imgUrl={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail }
                                                              categories={book.volumeInfo.categories} />
                                                        ))
          }
        </div>
      </div>
    );
  }
}

export default App;
