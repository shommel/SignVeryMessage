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

  const LEGACY_PATH = "m/44'/0'/0'"

  const [showImage, setShowImage] = useState(false);
  const [xpub, setxPub] = useState("");
  const [qrCodeData, setQRCodeData] = useState("");
  const [challengeMessage, setChallengeMessage] = useState("");

  
  const getPublicKey = () => {
    TrezorConnect.getPublicKey({
      path: LEGACY_PATH,
      coin: "btc",
    }).then(resp => {
        if (resp.success) {
          setxPub(resp.payload.xpub)
        }
    })

  }

  const getChallengeString = () => {
    Axios.get(`/api/random/`
    ).then(resp => {
      if (resp.status === 200) {
        setChallengeMessage(resp.data.message);
      }
    });
  }

  const signMessage = () => {
    TrezorConnect.signMessage({
      path: LEGACY_PATH,
      message: challengeMessage,
    }).then(resp => {
      if (resp.success) {
        setQRCodeData(qrCodeData => (
          {...qrCodeData, 
            message: challengeMessage, 
            address: resp.payload.address, 
            signature: resp.payload.signature,
            xpub: xpub
          })
        );
        setShowImage(true);
        Axios.post(`/api/verify/`, {
          'address': resp.payload.address,
          'message': challengeMessage,
          'signature': resp.payload.signature,
        },
        {
          headers: {
              "Content-Type": 'application/json'
          }
        }).then(res => alert(res))
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trezor Integration</h1>
        <p>Please plug-in your Trezor!</p>
        <button onClick={getChallengeString}>Generate Random Message</button>
        <p></p>
        <button onClick={getPublicKey}>Get xpub</button>
        <p></p>
        <button onClick={signMessage}>Sign Message</button>
        {showImage && <QRCode className="xPubQrCode" value={JSON.stringify(qrCodeData)}/>} 
      </header>
    </div>
  );
}

export default App;
