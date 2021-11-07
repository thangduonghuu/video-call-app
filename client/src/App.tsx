import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Welcome from 'pages/Welcome/Welcome';
import HomePage from 'pages/HomePage/HomePage';
import Room from 'pages/Room/Room';
import Sign from 'pages/Sign/Sign';
import PrivateRoute from 'features/privateRoute/PrivateRoute';
function App() {
  const isAuthenticated = Boolean(localStorage.getItem('owner'));
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute
            path="/home"
            authenticationPath="/sign"
            isAuthenticated={isAuthenticated}
          >
            <HomePage />
          </PrivateRoute>
          <PrivateRoute
            path="/home"
            authenticationPath="/sign"
            isAuthenticated={isAuthenticated}
          >
            <Room />
          </PrivateRoute>

          <Route path="/sign">
            <Sign />
          </Route>
          <Route exact path="/">
            <Welcome />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
