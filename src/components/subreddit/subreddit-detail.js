import React from 'react';
import ReactDom from 'react-dom';
import SubredditForm from './subreddit-form';
import superagent from 'superagent';

const API_URL = 'https://www.reddit.com/r';

class SubredditDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subredditLookup: {},
      subredditSelected: null,
      error: false,
    }

    this.subredditSelect = this.subredditSelect.bind(this);
  }

  componentDidUpdate() {
    console.log('search status:', this.state);
  }

  // componentDidMount() {
  //   if (localStorage.subredditLookup) {
  //     let subredditLookup = JSON.parse(localStorage.subredditLookup);
  //     this.setState({ subredditLookup });
  //   } else {
  //     superagent.get(`${API_URL}/subreddit/`)
  //     .then( res => {
  //       let subredditLookup = res.body.results.reduce((lookup, n) => {
  //         lookup[n.name] = n.url;
  //         return lookup;
  //       }, {});

  //       localStorage.subredditLookup = JSON.stringify(subredditLookup);
  //       this.setState({ subredditLookup });
  //     })
  //     .catch(console.error);
  //   }
  // }

  subredditSelect(userInput) {
    superagent.get(`${API_URL}/${userInput.subredditName}.json?limit=${userInput.numberResults}`)
      .then( res => {
        this.setState({ subredditSelected: res.body })
        this.setState({ error: false})
      })
      .catch((e) => this.setState({error: true})
      )
  }

  render() {
    
    return (
      <React.Fragment>
        <h1>Subreddit Wiki</h1>

        <SubredditForm subredditSelect={this.subredditSelect} />

        {!this.state.subredditSelected ?
          <p>please select a subreddit</p> :
          <section className="subreddit">
            <h2>Selected Subreddit: {this.state.subredditSelected.data.children[0].data.subreddit}</h2>
            <h3>Articles:</h3>
            <ul>
              {this.state.subredditSelected.data.children.map((item, i) => {
                if(i > 1){
                  return (
                    <li key={i}>
                      <p>{item.data.title}</p>
                      <p><a href={item.data.url}>Click for more</a></p>
                    </li>
                  )
                }
              })}
            </ul>
          </section>
        }
      </React.Fragment>
    )
  }
}

export default SubredditDetail;