import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const baseUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev`
          : 'http://localhost:8000';
        const apiUrl = `${baseUrl}/api/teams/`;

        console.log('Fetching teams from:', apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log('Fetched teams data:', data);

        // Handle both paginated and plain array responses
        const teamsData = data.results || data;
        setTeams(teamsData);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading teams...</span>
        </div>
        <p className="mt-2">Loading teams...</p>
      </div>
    </div>
  );
  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error Loading Teams</h4>
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
          <h1 className="display-4 text-center">Teams</h1>
          <p className="lead text-center">Discover the competing teams in Octofit Tracker</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Team List</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Team ID</th>
                      <th scope="col">Team Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team) => (
                      <tr key={team.id}>
                        <td>{team.id}</td>
                        <td><strong>{team.name}</strong></td>
                        <td>
                          <button className="btn btn-primary btn-sm me-2">View Details</button>
                          <button className="btn btn-outline-secondary btn-sm">Members</button>
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

export default Teams;