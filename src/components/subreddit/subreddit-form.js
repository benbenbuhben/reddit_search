import React from 'react';
import ReactDom from 'react-dom';

class SubredditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subredditName: '',
      numberResults: 0,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubredditNameChange = this.handleSubredditNameChange.bind(this);
    this.handleSubredditResultsChange = this.handleSubredditResultsChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let userInput = {
      subredditName: this.state.subredditName,
      numberResults: this.state.numberResults,
    }
    this.props.subredditSelect(userInput);
  }

  handleSubredditNameChange(e) {
    this.setState({ subredditName: e.target.value });
  }

  handleSubredditResultsChange(e) {
    this.setState({ numberResults: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='subredditName'
          placeholder='search for a subreddit'
          value={this.state.subredditName}
          onChange={this.handleSubredditNameChange} />
        <input
          type='number'
          name='subredditResults'
          placeholder='# of results'
          value={this.state.numberResults}
          onChange={this.handleSubredditResultsChange} />
          <button onClick={(e) => this.handleSubmit(e)}>Search</button>
      </form>
    )
  }
}

export default SubredditForm;