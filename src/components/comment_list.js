import React, { Component } from 'react';

export default class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = { comments: []};
  }

  // handleChange(event) {
  //   this.setState({ comment: event.target.value });
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   this.setState( {comment: ''});
  // }

  render() {
    return(
      <div className="comment-list">
        {/* <textarea
         value={this.state.comment}
         onChange={this.handleChange.bind(this)} />
        <button action='submit'> Submit Comment</button> */}
      </div>
    )
  }
}
