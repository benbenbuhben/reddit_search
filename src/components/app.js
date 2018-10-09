import React from 'react';
import ReactDom from 'react-dom';
import SubredditDetail from './subreddit/subreddit-detail.js';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SubredditDetail></SubredditDetail>
      </React.Fragment>
    )
  }
}

export default App;