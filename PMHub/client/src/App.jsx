import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MediaLibrary from './components/Library/MediaLibrary';
import SearchBar from './components/Search/SearchBar';
import MediaList from './components/Lists/MediaList';

const App = () => {
  return (
    <Router>
      <div className="app">
        <SearchBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/library" component={MediaLibrary} />
          <Route path="/lists" component={MediaList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;