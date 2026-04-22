import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
const apiUrl =
    "https://animated-space-sniffle-774vv9g6vwwfxxxq-8000.app.github.dev/api/leaderboard/";
        
        console.log('Fetching leaderboard from:', apiUrl);
        

        let response = await fetch(apiUrl);
        if (!response.ok) {
          // If codespace URL fails, try localhost as fallback

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        const data = await response.json();

        console.log('Fetched leaderboard data:', data);

        // Handle both paginated and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(leaderboardData);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading leaderboard...</span>
        </div>
        <p className="mt-2">Loading leaderboard...</p>
      </div>
    </div>
  );
  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error Loading Leaderboard</h4>
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
          <h1 className="display-4 text-center">Leaderboard</h1>
          <p className="lead text-center">See how you rank against other fitness enthusiasts</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Top Performers</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Rank</th>
                      <th scope="col">User</th>
                      <th scope="col">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => (
                      <tr key={entry.id} className={index < 3 ? 'table-warning' : ''}>
                        <td>
                          {index + 1}
                          {index === 0 && <span className="badge bg-warning ms-2">🥇</span>}
                          {index === 1 && <span className="badge bg-secondary ms-2">🥈</span>}
                          {index === 2 && <span className="badge bg-warning ms-2" style={{backgroundColor: '#CD7F32'}}>🥉</span>}
                        </td>
                        <td>{entry.user?.username || 'Unknown User'}</td>
                        <td><strong>{entry.score}</strong></td>
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

export default Leaderboard;