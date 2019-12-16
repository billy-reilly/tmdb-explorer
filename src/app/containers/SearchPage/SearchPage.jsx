import React from 'react';
import axios from 'axios';

import { browserHistoryPropType } from '../../models/propTypes/routerPropTypes';
import { getQueryParameter } from '../../helpers/queryHelpers';

import Header from '../../components/Header/Header';
import SearchResults from '../../components/SearchResults/SearchResults';
import Loader from '../../components/Loader/Loader';

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearchTerm: '',
      isLoading: false,
      searchResults: [],
      totalResults: 0
      // TODO: error state
    };

    this.fetchSearchResults = this.fetchSearchResults.bind(this);
    this.renderPageContent = this.renderPageContent.bind(this);
  }

  componentDidMount() {
    this.fetchSearchResults();
  }

  componentDidUpdate(prevProps) {
    if (this.getSearchQuery(prevProps) !== this.getSearchQuery(this.props)) {
      this.fetchSearchResults();
    }
  }

  getSearchQuery(props = this.props) {
    return getQueryParameter(props.location.search, 'q');
  }

  fetchSearchResults() {
    const searchQuery = this.getSearchQuery();
    if (searchQuery) {
      this.setState({
        currentSearchTerm: searchQuery,
        isLoading: true
      });

      const { TMDB_API_KEY } = process.env;

      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchQuery}`
        )
        .then(res => {
          this.setState({
            searchResults: res.data.results,
            totalResults: res.data.total_results,
            isLoading: false
          });
        })
        .catch(() => {
          // TODO error handling
        });
    }
  }

  renderPageContent() {
    if (this.state.isLoading) {
      return <Loader />;
    }

    // TODO rendering for error state

    return (
      <SearchResults
        currentSearchTerm={this.state.currentSearchTerm}
        searchResults={this.state.searchResults}
        totalResults={this.state.totalResults}
      />
    );
  }

  render() {
    const { history } = this.props;
    return (
      <>
        <Header history={history} />
        {this.renderPageContent()}
      </>
    );
  }
}

SearchPage.propTypes = {
  history: browserHistoryPropType.isRequired
};
