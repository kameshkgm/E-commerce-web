import React, { useContext, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const Name = () => {
  const { name, email, orders } = useContext(AuthContext);
  const [showOrders, setShowOrders] = useState(false);

  const toggleShowOrders = () => {
    setShowOrders(!showOrders);
  };

  return (
    <div
      className={`container-fluid d-flex flex-column justify-content-center align-items-center ${showOrders ? 'bg-success' : ''}`}
      style={{
        backgroundImage: showOrders ? 'url(./assets/p1.jpg)' : 'url(./assets/profile.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        color: '#fff',
        backgroundRepeat: 'repeat-y',
        height: '100%'
      }}
    >
      <Link to="/home" className="btn btn-danger animate__animated animate__fadeInRight position-absolute top-0 end-0 mt-4 me-4">Back</Link>
      <div className="p-4" style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 className="text-center mb-4 animate__animated animate__bounceIn" style={{ fontFamily: 'Algerian', color: 'red' }}>
          Welcome, {name}!
        </h1>
        <h2 className="text-center mb-4 animate__animated animate__fadeInUp" style={{ color: 'red' }}>{email}</h2>
        <div className="text-center">
          <button className="btn btn-primary mb-4 animate__animated animate__pulse animate__infinite" onClick={toggleShowOrders} style={{ color: 'red' }}>
            {showOrders ? 'Hide Orders' : 'Show Orders'}
          </button>
        </div>
      </div>
      {showOrders && orders.length > 0 && (
        <div className="w-100 d-flex flex-column align-items-center">
          {orders.map((order, orderIndex) => (
            <div key={orderIndex} className={`mb-4 animate__animated animate__fadeIn`} style={{ backgroundColor: '#FF5B5B', maxWidth: '500px', padding: '20px' }}>
              <h3 className="text-center" style={{ color: '#fff' }}>Order {orderIndex + 1}</h3>
              <table className="table table-striped table-bordered mt-3" style={{ width: '3000px' }}>
                <thead className="thead-dark">
                  <tr>
                    <th style={{ backgroundColor: '#87CEFA', textAlign: 'center' }}>Item Title</th>
                    <th style={{ backgroundColor: '#87CEFA', textAlign: 'center' }}>Item Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td style={{ textAlign: 'center' }}>{item.title}</td>
                      <td style={{ textAlign: 'center' }}>${item.price.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="table-success">
                    <td style={{ textAlign: 'center' }}><strong>Total Price</strong></td>
                    <td style={{ textAlign: 'center' }}><strong>${order.items.reduce((total, item) => total + item.price, 0).toFixed(2)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Name;
