import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Interviews from './components/Interviews'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/api/interviews/'>
            <Interviews />
          </Route>
          <Route path='/'>
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
