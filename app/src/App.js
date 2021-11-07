import './App.css';
import TrezorConnect from 'trezor-connect';
import QRCode from 'qrcode.react';
import React, {useState} from "react";

function initTrezor() {
  TrezorConnect.init({
  // connectSrc: 'https://localhost:8088/',
  lazyLoad: false,
    manifest: {
      email: 'developer@xyz.com',
      appUrl: 'http://your.application.com',
    },
  }).then(() => {
      console.log('trezor-connect', 'TrezorConnect is ready!');
  }).catch(error => {
      console.log('trezor-connect', 'TrezorConnect init error:' + error);
  });
}

function App() {

  const [showImage, setShowImage] = useState(false);
  const [xpub, setxPub] = useState("")
  initTrezor();
  
  const getPublicKey = () => {
      TrezorConnect.getPublicKey({
        path: "m/49'/0'/0'",
        coin: "btc"
      }).then(resp => {
          if (resp.success) {
            console.log(resp.payload.xpub);
            setShowImage(true);
            setxPub(resp.payload.xpub)
          }
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trezor Integration</h1>
        <p>Please plug-in your Trezor!</p>
        <button onClick={getPublicKey}>Get xpub</button>
        {showImage && <QRCode className="xPubQrCode" value={xpub}/>} 
      </header>
    </div>
  );
}

export default App;
