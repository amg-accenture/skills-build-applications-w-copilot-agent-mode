import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const baseUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev`
          : 'http://localhost:8000';
        const apiUrl = `${baseUrl}/api/activities/`;

        console.log('Fetching activities from:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log('Fetched activities data:', data);

        // Handle both paginated and plain array responses
        const activitiesData = data.results || data;
        setActivities(activitiesData);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading activities...</span>
        </div>
        <p className="mt-2">Loading activities...</p>
      </div>
    </div>
  );
  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error Loading Activities</h4>
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
          <h1 className="display-4 text-center">Activities</h1>
          <p className="lead text-center">Track your fitness activities and progress</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Recent Activities</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">User</th>
                      <th scope="col">Workout</th>
                      <th scope="col">Duration (min)</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((activity) => (
                      <tr key={activity.id}>
                        <td>{activity.user?.username || 'Unknown User'}</td>
                        <td>{activity.workout?.name || 'Unknown Workout'}</td>
                        <td>{activity.duration}</td>
                        <td>{new Date(activity.timestamp).toLocaleDateString()}</td>
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

export default Activities;