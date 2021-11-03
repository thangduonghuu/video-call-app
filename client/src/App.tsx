import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Welcome from 'pages/Welcome/Welcome';
import HomePage from 'pages/HomePage/HomePage';
import Room from 'pages/Room/Room';
import Sign from 'pages/Sign/Sign';
function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/sign">
            <Sign />
          </Route>
        </Switch>
      </BrowserRouter> */}
      {/* <HomePage /> */}
      <Room />
    </div>
  );
}

export default App;
