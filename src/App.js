/*global google*/
import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Results from './components/Results/Results'
import Bodyweight from './components/Bodyweight/Bodyweight'
import Nuggulator from './components/Nuggulator/Nuggulator'
import countries from './components/engines/noCountries'
import Signature from './components/Signature/Signature'


const initialState = {
  origin: '',
  destination: '',
  distance: '',
  polyline: '',
  currentCount: '',
  bindingNumber: '',
  gender: 'female',
  weight: 130,
  height: 64,
  age: 25,
  average: '',
  route: 'start',
  country: ''
}

class App extends Component{ 
  
  constructor() {
    super();
    this.state = initialState;
  }

  onRouteChange = (route) => {
    if (route === 'start') {
      this.setState(initialState)
      this.setState({average: ''})
      console.log(this.state);
    } else 
    this.setState({route: route});
  }

  onInputChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  onSubmit = (route) => {
    this.onRouteChange(route);
  }

  onMainSubmit = (route) => {
    if (this.state.origin !== '' && this.state.destination !== ''){
    this.onRouteChange(route);}
    else {this.onRouteChange('submit-error')}
  }

  onOriginLoaded = (place) => {
    let address = place.formatted_address.split(', ')
    this.setState({country: address[address.length-1]})
    if (countries.includes(this.state.country)){
      this.setState({route: 'no-country'});
    }
    this.setState({origin: place.formatted_address})
}

  onDestinationLoaded = (place) => {
    this.setState({destination: place.formatted_address})   
}

  directionsFinder = () => {
        const directionsService = new google.maps.DirectionsService();

        const origin = this.props.origin;
        const destination = this.props.destination;

        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.WALKING
            },
            (result) => {
                this.props.distanceUpdater(result.routes[0].legs[0].distance.text);
            }
        )
  }

  distanceUpdater = (distance,polyline) => {
    this.setState({distance: distance})
    this.setState({polyline: polyline})
  }

  avgTruth = () => {
    this.setState({average: true})
  }
  
  render() {
    const { route } = this.state; 
    return (
      <div className="App">
        <header className="App-header">
          { route === "impossible" 
          ?<div className = "center f3"><p>Woah buddy, that won't work. </p>
          <p>Are you trying to cross oceans? The Himalayas? Dicey political borders?</p>
          <button 
            onClick={() => this.onSubmit('start')}
            className ="w-30 grow f4 pointer link ph3 pv2 
            dib white bg-light-purple"> Try Again</button> 
          </div>
        : (route === 'start'
          ? <div>
            <Navigation  
            onOriginLoaded = {this.onOriginLoaded} 
            onDestinationLoaded = {this.onDestinationLoaded}
            distanceUpdater = {this.distanceUpdater}
            directionsFinder = {this.directionsFinder} 
            onMainSubmit = {this.onMainSubmit} 
            onRouteChange = {this.onRouteChange} />
          </div>
          : (route === 'submit-error'
          ? <div className = "center f3"><p>Hey. Follow the rules.</p>
          <p>Please pick an ORIGIN and DESTINATION from the Google dropdown before submitting.</p>
          <button 
            onClick={() => this.onSubmit('start')}
            className ="w-30 grow f4 pointer ph3 pv2 
            dib white bg-light-purple"> Try Again</button>
          </div>
          : (route === 'no-country'
          ? <div className = "center f3"><p>Oh my God. I'm so sorry. There are no McNuggets in your origin country.</p>
          <p>Maybe you should move?</p>
          <button 
            onClick={() => this.onSubmit('start')}
            className ="w-30 grow f4 pointer link ph3 pv2 
            dib white bg-light-purple"> Try Again</button>
          </div>
          
          : (route === 'nuggulator'
          ? <Nuggulator 
          {...this.state}
          onRouteChange = {this.onRouteChange} />
          : (route === 'body'
          ? 
            <Bodyweight
            {...this.state}
            onRouteChange = {this.onRouteChange}
            distanceUpdater = {this.distanceUpdater} 
            onInputChange = {this.onInputChange} 
            onButtonSubmit = {this.onSubmit} 
            avgTruth = {this.avgTruth}/>
            
           : <Results 
           {...this.state} 
           distanceUpdater = {this.distanceUpdater} 
           onRouteChange = {this.onRouteChange} />)
        ))))}
        </header>
        <Signature />
      </div>
    );
  }
}

export default App;
