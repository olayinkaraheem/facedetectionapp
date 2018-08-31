import React, { Component } from 'react';
import 'tachyons';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceDetect from './components/FaceDetect/FaceDetect';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
      

const particlesOptions= {
                particles: {
                 /* line_linked: {
                    shadow: {
                      enable: true,
                      color: "#3CA9D1",
                      blur: 5
                    }
                  },*/
                  number: {
                    value: 30,
                    density: {
                      enable: true,
                      value_area: 800
                    }
                  }
                }
              };

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedin: false,
      user: {
        id: '',
        name: '',
        email: '',
        rank: '',
        joined: '',
      }
    }

class App extends Component {

  constructor(){
    super();
    this.state = initialState
  }

  /*componentDidMount() {
    fetch('http://localhost:3000')
    .then( res => res.json())
    .then(console.log)
  }*/

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onDetectSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://facedetectionappapi.herokuapp.com/imageurl', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                input: this.state.input
            })
          })
    .then( response => response.json() )
    .then( response => 
      {
        if(response){
          fetch('https://facedetectionappapi.herokuapp.com/image', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.user.id 
            })
          })
          .then( entry => entry.json() )
          .then( entry => {
              this.setState(Object.assign(this.state.user, { rank: entry}))
            })
          .catch(err => "Error Occured!")
        }
        
        this.displayFaceRegion(this.calculateFaceRegion(response))
      })
    .catch( err => console.error(err));
  }

  calculateFaceRegion = (data) => {
    const faceRegion = data.outputs[0].data.regions[0].region_info.bounding_box;
    const inputImage = document.getElementById('input-image');
    const imageHeight = Number(inputImage.height);
    const imageWidth = Number(inputImage.width);
    return {
      leftCol: faceRegion.left_col * imageWidth,
      rightCol: imageWidth - (faceRegion.right_col * imageWidth),
      topRow: faceRegion.top_row * imageHeight,
      bottomRow: imageHeight - (faceRegion.bottom_row * imageHeight)
    }
  }

  displayFaceRegion = (box) => {
    this.setState({box : box});
    /*
    OR
    this.setState({box});
    */
  }
  
  //onRouteChange = (route) => {
    //this.setState({route: route});
    /*
    OR
    this.setState({route});
    */
  //}
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedin: true})
    }
    this.setState({route: route});
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        rank: data.entries,
        joined: data.joined,
      }
    })
  }

  render() {
    const { isSignedIn, imageUrl, route, box, user } = this.state;
    return (
      <div className="App">
        <Particles params={particlesOptions} className="particles" />
        <Navigation onRouteChange = {this.onRouteChange} isSignedin = {this.state.isSignedin} />
        { 
          route === 'home' 
        ?
          <div>
            <Logo />
            <Rank user={user}/>
            <ImageLinkForm onInputChange={this.onInputChange} onDetectSubmit={this.onDetectSubmit} />
            <FaceDetect box = {box} imageUrl = {imageUrl} />
          </div>
        : (
            route === 'signin'
              ? <SignIn loadUser = { this.loadUser } onRouteChange = {this.onRouteChange} />
              : <Register loadUser = { this.loadUser } onRouteChange = {this.onRouteChange} />
          )
          

        }
        
      </div>
    );
  }
}

export default App; 