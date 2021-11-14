import './App.css';
import TrezorConnect from 'trezor-connect';
import QRCode from 'qrcode.react';
import React, {useState} from 'react';

function initTrezor() {
  // initiate trezor device connection
  // TODO: update connectSrc and manifest for production

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
  initTrezor();

  const [showImage, setShowImage] = useState(false);
  const [xpub, setxPub] = useState("");
  const [qrCodeData, setQRCodeData] = useState("");

  // mocked random message generation
  const CHALLENGE_MESSAGE = "abc123"

  
  const getPublicKey = () => {
    TrezorConnect.getPublicKey({
      path: "m/44'/0'/0'",
      coin: "btc",
    }).then(resp => {
        if (resp.success) {
          setxPub(resp.payload.xpub)
        }
    })

  }

  const signMessage = () => {
    TrezorConnect.signMessage({
      path: "m/44'/0'/0'",
      message: CHALLENGE_MESSAGE,
    }).then(resp => {
      if (resp.success) {
        setQRCodeData(qrCodeData => (
          {...qrCodeData, 
            message: CHALLENGE_MESSAGE, 
            address: resp.payload.address, 
            signature: resp.payload.signature,
            xpub: xpub
          })
        );
        setShowImage(true);
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trezor Integration</h1>
        <p>Please plug-in your Trezor!</p>
        <button onClick={getPublicKey}>Get xpub</button>
        <button onClick={signMessage}>Sign Message</button>
        {showImage && <QRCode className="xPubQrCode" value={JSON.stringify(qrCodeData)}/>} 
      </header>
    </div>
  );
}

export default App;
