import './App.css';
import TrezorConnect from 'trezor-connect';
import QRCode from 'qrcode.react';
import React, {useState} from 'react';
import Axios from "axios";

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
  const LEGACY_PATH = "m/44'/0'/0'"

  
  const getPublicKey = () => {
    TrezorConnect.getPublicKey({
      path: LEGACY_PATH,
      coin: "btc",
    }).then(resp => {
        console.log(resp)
        if (resp.success) {
          setxPub(resp.payload.xpub)
        }
    })

  }

  const signMessage = () => {
    TrezorConnect.signMessage({
      path: LEGACY_PATH,
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
        Axios.post(`/api/message/`, {
          'address': resp.payload.address,
          'message': CHALLENGE_MESSAGE,
          'signature': resp.payload.signature,
        },
        {
          headers: {
              "Content-Type": 'application/json'
          }
        }).then(res => console.log(res))
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trezor Integration</h1>
        <p>Please plug-in your Trezor!</p>
        <button onClick={getPublicKey}>Get xpub</button>
        <p></p>
        <button onClick={signMessage}>Sign Message</button>
        {showImage && <QRCode className="xPubQrCode" value={JSON.stringify(qrCodeData)}/>} 
      </header>
    </div>
  );
}

export default App;
