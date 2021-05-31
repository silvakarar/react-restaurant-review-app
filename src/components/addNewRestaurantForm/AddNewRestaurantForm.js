import React, { Component } from "react";
import "./AddNewRestaurantForm.css";
import { AiOutlineClose } from 'react-icons/ai';

class AddNewRestaurantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantName: "",
      restaurantAddress: "",
    
    };

  }

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      
    });
  
  };

  handleClick = event => {
    event.preventDefault();
    this.props.onFormSubmit(
      this.state.restaurantName,
      this.state.restaurantAddress
    );
  };


 // Close modal
  handleOnClick = (event) => {
    event.preventDefault();
    this.props.onFormClose()
   
  }


  render() {
    return (
      <form
        className="ui form"
        style={{ padding: "30px 20px", width: "400px" }}>
           <div className="exit-button-div">
          <button
           onClick={this.handleOnClick}
            className="exit-btn">
           <AiOutlineClose  style={{width: '30px', height: '30px'}}  />
          </button>
        </div>
        <div className="field">
          <label htmlFor="restaurantName">Restaurant Name</label>
          <input
            id="restaurantName"
            className="form-input"
            type="text"
            name="restaurantName"
            value={this.state.restaurantName}
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="restaurantAddress">Restaurant Address</label>
          <input
            id="restaurantAddress"
            className="form-input"
            type="text"
            name="restaurantAddress"
            value={this.state.restaurantAddress}
            onChange={this.handleChange}
          />
        </div>
        <br />
        <div className="button">
          <button
            onClick={this.handleClick}
            type="submit"
            className="ui secondary button"
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}

export default AddNewRestaurantForm;
