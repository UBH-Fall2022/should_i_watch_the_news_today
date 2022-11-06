import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-u8oz1jxf65retqd4.us.auth0.com"
      clientId="MkRg0Nsm7VtWb10RQIFXujTFORdrKCdC"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>, document.getElementById('root')
)
