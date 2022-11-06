import Dashboard from "./Dashboard";
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  if (!isAuthenticated) {
    //return <button className="login-button" onClick={loginWithRedirect}>Log in</button>
    return <div className="login-box" onClick={loginWithRedirect}><a href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      LOGIN
    </a>
    </div>
  } else {
    return <Dashboard />
  }
}
export default App
