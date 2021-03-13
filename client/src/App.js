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
import Password from './components/Password'
import UpdateInterview from './components/UpdateInterview'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path='/interview/update/:id' component={UpdateInterview} />
          <Route path='/interview/delete/:id' component={DeleteInterview} />
          <Route path='/interviews/:id' component={DetailedInterview} />
          <Route path='/interviews/'>
            <Interviews />
          </Route>
          <Route path='/schedule'>
            <Schedule />
          </Route>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/'>
            <Password />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
