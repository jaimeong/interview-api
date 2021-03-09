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
import DetailedInterview from './components/DetailedInterview'
import Schedule from './components/Schedule'
import DeleteInterview from './components/DeleteInterview'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/api/interview/delete/:id' component={DeleteInterview} />
          <Route path='/api/interviews/:id' component={DetailedInterview} />
          <Route path='/api/interviews/'>
            <Interviews />
          </Route>
          <Route path='/api/schedule'>
            <Schedule />
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
