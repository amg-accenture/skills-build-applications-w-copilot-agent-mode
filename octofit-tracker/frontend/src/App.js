import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
          <div className="container">
            <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
              <img
                src="/octofitapp-small.png"
                alt="Octofit Tracker Logo"
                className="app-logo me-2"
              />
              🏃‍♂️ Octofit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    <i className="fas fa-users me-1"></i>Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    <i className="fas fa-shield-alt me-1"></i>Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    <i className="fas fa-dumbbell me-1"></i>Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    <i className="fas fa-running me-1"></i>Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    <i className="fas fa-trophy me-1"></i>Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="container mt-4">
          <Routes>
            <Route path="/" element={
              <div className="text-center mt-5">
                <div className="jumbotron bg-light p-5 rounded shadow-sm">
                  <h1 className="display-4">Welcome to Octofit Tracker</h1>
                  <p className="lead">Track your fitness activities and compete with teams!</p>
                  <hr className="my-4" />
                  <p>Use the navigation above to explore users, teams, workouts, activities, and leaderboard.</p>
                  <div className="row mt-4">
                    <div className="col-md-3">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">Users</h5>
                          <p className="card-text">View all registered users and their profiles.</p>
                          <Link to="/users" className="btn btn-primary">View Users</Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">Teams</h5>
                          <p className="card-text">Discover competing teams and their members.</p>
                          <Link to="/teams" className="btn btn-primary">View Teams</Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">Workouts</h5>
                          <p className="card-text">Explore available workout types and activities.</p>
                          <Link to="/workouts" className="btn btn-primary">View Workouts</Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">Leaderboard</h5>
                          <p className="card-text">See how you rank against other fitness enthusiasts.</p>
                          <Link to="/leaderboard" className="btn btn-primary">View Leaderboard</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
