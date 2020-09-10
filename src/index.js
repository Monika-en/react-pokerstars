import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const API_KEY = "0445f2e6d1908c387af15db894090f71";
const API_URL = (loc, key) => `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=${key}`

class MyForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { location: '', temperature: '' };
  }

  mySubmitHandler = (event) => {
    event.preventDefault();

    fetch(API_URL(this.state.location.toString(), API_KEY))
      .then((response) => response.json())
      .then((responseJSON) => {
       this.setState({ temperature: responseJSON.main.temp });
      })
      .then( () => this.showTemperature())
      .catch((error) => {
        console.error(error);
      });    
  }

  myChangeHandler = (event) => {
    this.setState({location: event.target.value});
  }

  showTemperature() {
    document.getElementById("temperatureResult").classList.remove('hidden');
    ReactDOM.render(
        <p>
          Temperature in {this.state.location} is {this.state.temperature} °C.
        </p>
     , document.getElementById('temperatureResult')); 
  }

  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
      <input type='text' onChange={this.myChangeHandler} />
      <input  type='submit' />
      </form>
    );
  }
}

 ReactDOM.render(<MyForm />, document.getElementById('submitForm'));