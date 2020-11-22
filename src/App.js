import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Pages
import home from './pages/homepage';
import result from './pages/searchresult';

function App() {
  return (
    <div className="App">

      <div className="banner">
        <div className="container-title">
          <h1>Hacker News Search</h1>
        </div>
      </div>
      
      <Router>



        <div className = "container">
          <Switch>
            <Route exact path='/' component={home}/>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
