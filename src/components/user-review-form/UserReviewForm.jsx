import React, { Component } from "react";

class UserReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      review: "",
      name: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onFormSubmit(
      this.state.rating,
      this.state.review,
      this.state.name
    );
  };

  render() {
    return (
      <form
        className="ui form"
        style={{ padding: "30px 20px", width: "400px" }}>
        <div className="field">
          <label htmlFor="rating">Rating</label>
          <input
            id="rating"
            className="form-input"
            type="number"
            min="1" max="5"
            name="rating"
            value={this.state.rating  || ''}
            onChange={this.handleChange}/>
        </div>
        <div className="field">
          <label htmlFor="review">Review</label>
          <input
            id="review"
            className="form-input"
            type="text"
            name="review"
            value={this.state.review || ''}
            onChange={this.handleChange}/>
        </div>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className="form-input"
            type="text"
            name="name"
            value={this.state.name || ''}
            onChange={this.handleChange}/>
        </div>
        <br />
        <div className="button">
          <button
            onClick={this.handleSubmit}
            type="submit"
            className="ui secondary button">
            Save
          </button>
        </div>
      </form>
    );
  }
}
export default UserReviewForm;
