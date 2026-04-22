import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {

 const apiUrl =
    "https://animated-space-sniffle-774vv9g6vwwfxxxq-8000.app.github.dev/api/users/";
        console.log('Fetching users from:', apiUrl);
       // console.log('Using codespace URL:', !!codespaceName);

        let response = await fetch(apiUrl);
        if (!response.ok) {
          // If codespace URL fails, try localhost as fallback
         // if (codespaceName) {
         //   const localhostUrl = 'http://localhost:8000/api/users/';
         //   console.log('Codespace URL failed, trying localhost URL:', localhostUrl);
         //   response = await fetch(localhostUrl);
         // }
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        const data = await response.json();

        console.log('Fetched users data:', data);

        // Handle both paginated and plain array responses
        const usersData = data.results || data;
        setUsers(usersData);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading users...</span>
        </div>
        <p className="mt-2">Loading users...</p>
      </div>
    </div>
  );
  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error Loading Users</h4>
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
          <h1 className="display-4 text-center">Users</h1>
          <p className="lead text-center">Meet the fitness enthusiasts in our community</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">User Directory</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Team</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td><strong>{user.username}</strong></td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge ${user.team ? 'bg-success' : 'bg-secondary'}`}>
                            {user.team?.name || 'No Team'}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-primary btn-sm me-2">View Profile</button>
                          <button className="btn btn-outline-info btn-sm">Activities</button>
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

export default Users;