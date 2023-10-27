import logo from './logo.svg';
import location from './allowGeoLocation.png';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [status, setStatus] = useState(null);
  const [orientation, setOrientation] = useState(90);
  const [showOrnt, setShowOrnt] = useState(false);
  const [progress, setProgress] = useState('Please start tilting!');

  useEffect(() => {
    let delta = orientation - lat;
    /* console.log('orientation', orientation);
    console.log('lat: ', lat);
    console.log('delta: ', delta); */
    if(delta < 1 && delta > -1) {
      setProgress("Done! Now place the Mesh PlusPlus device with its solar panel at the same angle as your current device!");
    } else if(delta < 5 && delta > -5) {
      setProgress("Almost there, keep tilting!");
    }
  });

  const handleOrientation = event => {
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;
    setOrientation(beta);
    setProgress("Keep tilting...");
  }

  window.addEventListener('deviceorientation', handleOrientation);

  const getLocation = () => {
    /* navigator.permissions.query({ name: 'geolocation' }).then(function(result) {
      console.log("result: ", result.state);
      if(result.state == 'granted') {
        if(!navigator.geolocation) {
          setStatus("Geolocation is not supported by your browser");
        } else {
          setStatus("Locating...");
          navigator.geolocation.getCurrentPosition((position) => {
            setStatus(null);
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            setShowOrnt(true);
          }, failure => {
            if (failure.message.startsWith("Only secure origins are allowed")) {
              setStatus("HTTPS error with getGeoLocation!");
            } else setStatus("Unable to retrieve your location");
          });
        }
      } else {
        alert("Permission not granted!");
      }
    }); */
    if(!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        setShowOrnt(true);
      }, failure => {
        if (failure.message.startsWith("Only secure origins are allowed")) {
          setStatus("HTTPS error with getGeoLocation!");
        } else setStatus("Unable to retrieve your location");
      });
    }
  }
  return (
    <div className="App">
      <h3 style={{width: '70vw', margin: 'auto'}}>To use this app you must allow it to access your GeoLocation. Please click on the button below and then click on allow as shown in the image below.</h3>
      <img src={location} />
      <br/>
      <button onClick={getLocation}>Get Location</button>
      <h1>Coordinates</h1>
      <p>{status}</p>
      { showOrnt && (
        <div>
          {lat && <p>Your current Latitude is: {lat}</p>}
          <p>Please tilt your device until the orientation shown below is the same value as your latitude shown above.</p>
          <h1>Current device orientation: {orientation}</h1>
          <h1 style={{width: '70vw', margin: 'auto'}}>{progress}</h1>
          {/* <p>Alpha: {orientation[0]}</p> */}
          {/* <p>Beta: {orientation[1]}</p> */}
          {/* <p>Gamma: {orientation[2]}</p> */}
        </div>
      )}
    </div>
  );
}

export default App;
