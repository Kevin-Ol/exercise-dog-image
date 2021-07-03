/* eslint-disable max-len */
/* eslint-disable no-alert */
import React, { Component } from 'react';
import './App.css';
import Img from './Img';

class App extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      picture: '',
      status: false,
    };

    this.fetchDog = this.fetchDog.bind(this);
    this.handleDogName = this.handleDogName.bind(this);
    this.handleSaveOnStorage = this.handleSaveOnStorage.bind(this);
    this.handleDogOnStorage = this.handleDogOnStorage.bind(this);
  }

  // componentDidMount() {
  //   fetch('https://dog.ceo/api/breeds/image/random')
  //     .then((response) => response.json())
  //     .then((result) => {
  //       this.setState({
  //         picture: result.message,
  //       });
  //     });
  // }

  componentDidMount() {
    if (localStorage.getItem('dog')) {
      this.handleDogOnStorage();
    } else {
      this.fetchDog();
    }
  }

  shouldComponentUpdate(_nextProps, nextState) {
    if (nextState.picture.includes('terrier')) {
      return false;
    }
    return true;
  }

  handleDogOnStorage() {
    const storage = localStorage.getItem('dog');
    const array = JSON.parse(storage);
    const [name, picture] = array;
    this.setState({
      name,
      picture,
      status: true,
    });
  }

  handleDogName({ target }) {
    const { value } = target;

    this.setState({
      name: value,
    });
  }

  handleSaveOnStorage() {
    const { name, picture } = this.state;
    const value = [name, picture];
    localStorage.setItem('dog', JSON.stringify(value));
  }

  alertDog() {
    const { picture } = this.state;

    if (picture.includes('terrier')) {
      alert('terrier not allowed');
    } else {
      alert(`Raça: ${picture.split('/')[4]}`);
    }
  }

  async fetchDog() {
    this.setState({ status: false });

    const request = await fetch('https://dog.ceo/api/breeds/image/random');
    const result = await request.json();

    this.setState({
      picture: result.message,
      status: true,
    });

    this.alertDog();
  }

  render() {
    const { name, picture, status } = this.state;

    return (
      <div>
        { name && <span>{ name }</span> }
        { status ? <Img src={ picture } alt="dog" /> : <span>Loading...</span> }
        <input type="text" value={ name } onChange={ this.handleDogName } />
        <button type="button" onClick={ this.handleSaveOnStorage }>Nomear Cachorro</button>
        <button type="button" onClick={ this.fetchDog }>Outro cachorro</button>
      </div>
    );
  }
}

export default App;
