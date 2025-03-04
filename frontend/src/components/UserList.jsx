import React, { useEffect, useState } from "react";
import { api } from "../utils/api"; // Import Axios instance

const UserList = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users"); // Fetch users
        setUsers(response.data); // Store data in state
      } catch (err) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users available</p> // Ensure this message is rendered when users are empty
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
