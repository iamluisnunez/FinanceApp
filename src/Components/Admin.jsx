import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from your API when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/users");
        setUsers(response.data); // Assuming your API returns an array of user objects
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    // Handle the delete user logic here
    try {
      await axios.delete(`http://localhost:3000/users/users/${userId}`);
      // After successfully deleting the user, update the state to remove the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(user.user_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
