import Sign from 'features/sign/Sign';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Welcome from 'features/welcome/Welcome';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/sign">
            <Sign />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
