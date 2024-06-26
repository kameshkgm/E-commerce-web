// Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [name, setName] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch user's name
    axios.get('/api/profile/name')
      .then(response => setName(response.data.name))
      .catch(error => console.error('Error fetching name:', error));

    // Fetch user's past orders
    axios.get('/api/profile/orders')
      .then(response => setOrders(response.data.orders))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <h2>Past Orders:</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>{order.date} - Total: {order.total}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
