import React from 'react';
import ReactDOM from 'react-dom';

var Page = React.createClass({
  getInitialState: function() {
    return {
      text: "",
      addPhotoText: "Add Photo",
      photoAdded: false
    }
  },

  handleChange: function (event) {
    this.setState({text: event.target.value})
  },

  onAddPhotoBtnClicked: function(event) {
    this.setState({photoAdded: !this.state.photoAdded})
  },

  remainingCharacters: function() {
    var remainingChars = 140-this.state.text.length;
    if (this.state.photoAdded) {
      remainingChars -= 23;
    }
    return remainingChars;
  },

  overflowAlert: function() {
    console.log('this.state.photoAdded ' , this.state.photoAdded);
    var photoChars = this.state.photoAdded ? 23 : 0;
    var lastCharactersBeforeOverflow = this.state.text.substring(140-10-photoChars, 140-photoChars);
    var overflowCharacters = this.state.text.substring(140-photoChars);
    if (this.remainingCharacters() < 0) {
      return(
        <div className="alert alert-warning">
          <strong>Oops! Too Long:</strong>
          &nbsp;...{lastCharactersBeforeOverflow}
          <strong className="bg-danger">{overflowCharacters}</strong>
        </div>
        );
    } else {
      return "";
    }
  },

  render: function() {
    return (
      <div className="well clearfix">
        {this.overflowAlert()}
        <textarea onChange={this.handleChange} className="form-control"></textarea><br/>
        <span>{this.remainingCharacters()}</span>
        <button className="btn btn-primary pull-right" disabled={this.remainingCharacters() === 140}>Tweet</button>
        <button onClick={this.onAddPhotoBtnClicked} className="btn btn-primary pull-right">{this.state.photoAdded ? "✓ Photo Added" : "Add Photo" }</button>
      </div>
    );
  }
});

ReactDOM.render(<Page/>, document.getElementById('app'));
