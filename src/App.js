import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecongnition from './components/faceRecognition/FaceRecognition';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
import ParticlesBg from 'particles-bg';
import './App.css';


const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: '',
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: '',
      }
    };
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }})
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

displayFaceBox = (box) => {
  this.setState({box: box})
}


  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }





  onButtonSubmit = () => { 
    this.setState({imageUrl: this.state.input})
    fetch('https://whispering-spire-25106.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        input: this.state.input
      })
    })
     .then(response => response.json())
      .then(response => {
        fetch('https://whispering-spire-25106.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }



  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} num={200} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      { route === 'home' 
        ? <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecongnition box={box} imageUrl={imageUrl}/>
          </div>
          : (
          route === 'signin' ?
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : route === 'register' ?
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          : <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
      }
    </div>
    )
  }
}

export default App;
