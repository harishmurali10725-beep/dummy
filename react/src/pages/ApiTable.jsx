import React, { useEffect, useState } from "react";
import './ApiTable.css';

function ApiTable() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message || "Unknown error");
      }
    }

    fetchUsers();
  }, []); 

  if (error) return <div className="api-table-container"><div style={{ color: "red" }}>Error: {error}</div></div>;
  if (!users.length) return <div className="api-table-container"><div>No users found.</div></div>;

  return (
    <div className="api-table-container">
      <h2>Users</h2>
      <div className="table-responsive">
        <table border="1" cellPadding="6" cellSpacing="0" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>username</th>
            <th>email</th>
            <th>phone</th>
            <th>company</th>
            <th>city</th>
            <th>zipcode</th>
            <th>lat</th>
            <th>lng</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.company?.name ?? ""}</td>
              <td>{u.address?.city ?? ""}</td>
              <td>{u.address?.zipcode ?? ""}</td>
              <td>{u.address?.geo?.lat ?? ""}</td>
              <td>{u.address?.geo?.lng ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default ApiTable;