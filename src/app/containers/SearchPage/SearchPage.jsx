import React from 'react';
import axios from 'axios';

import { browserHistoryPropType } from '../../models/propTypes/routerPropTypes';
import { getQueryParameter } from '../../helpers/queryHelpers';

import Header from '../../components/Header/Header';
import SearchResults from '../../components/SearchResults/SearchResults';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearchTerm: '',
      isLoading: false,
      searchResults: [],
      totalResults: 0,
      page: 0
      // TODO: error state
    };

    this.fetchMoreResults = this.fetchMoreResults.bind(this);
  }

  componentDidMount() {
    this.fetchFirstPageOfResults();
  }

  componentDidUpdate(prevProps) {
    if (this.getSearchQuery(prevProps) !== this.getSearchQuery(this.props)) {
      this.fetchFirstPageOfResults();
    }
  }

  getSearchQuery(props = this.props) {
    return getQueryParameter(props.location.search, 'q');
  }

  fetchSearchResults(
    currentSearchTerm,
    page,
    existingSearchResults = this.state.searchResults
  ) {
    this.setState({ isLoading: true });

    const { TMDB_API_KEY } = process.env;

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${currentSearchTerm}&page=${page}`
      )
      .then(res => {
        this.setState({
          searchResults: existingSearchResults.concat(res.data.results),
          totalResults: res.data.total_results,
          isLoading: false,
          page
        });
      })
      .catch(() => {
        // TODO error handling
      });
  }

  fetchFirstPageOfResults() {
    const searchQuery = this.getSearchQuery();
    if (searchQuery) {
      const searchResults = [];
      this.setState({
        currentSearchTerm: searchQuery,
        searchResults
      });

      this.fetchSearchResults(searchQuery, 1, searchResults);
    }
  }

  fetchMoreResults() {
    const { searchResults, totalResults, currentSearchTerm, page } = this.state;
    if (searchResults.length < totalResults) {
      this.fetchSearchResults(currentSearchTerm, page + 1);
    }
  }

  render() {
    const { history } = this.props;
    return (
      <>
        <Header history={history} />
        <SearchResults
          currentSearchTerm={this.state.currentSearchTerm}
          searchResults={this.state.searchResults}
          totalResults={this.state.totalResults}
          onLoadMoreClick={this.fetchMoreResults}
          isLoading={this.state.isLoading}
        />
      </>
    );
  }
}

SearchPage.propTypes = {
  history: browserHistoryPropType.isRequired
};
