import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const baseUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev`
          : 'http://localhost:8000';
        const apiUrl = `${baseUrl}/api/workouts/`;

        console.log('Fetching workouts from:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log('Fetched workouts data:', data);

        // Handle both paginated and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(workoutsData);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading workouts...</span>
        </div>
        <p className="mt-2">Loading workouts...</p>
      </div>
    </div>
  );
  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error Loading Workouts</h4>
        <p>{error}</p>
        <hr />
        <p className="mb-0">Please try refreshing the page or contact support if the problem persists.</p>
      </div>
    </div>
  );

  return (
    <div className="container mt-4 fade-in">
      <div className="row mb-4">
        <div className="col">
          <h1 className="display-4 text-center">Workouts</h1>
          <p className="lead text-center">Explore available workout types and activities</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Available Workouts</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Workout Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workouts.map((workout) => (
                      <tr key={workout.id}>
                        <td><strong>{workout.name}</strong></td>
                        <td>{workout.description}</td>
                        <td>
                          <button className="btn btn-success btn-sm me-2">Start Workout</button>
                          <button className="btn btn-outline-primary btn-sm">View Activities</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;