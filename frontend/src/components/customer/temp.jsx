import React, { useEffect, useState } from 'react';
import OrderService from '../../services/OrderService';
import SideBar from './SideBar';
import { useAuth } from '../../hooks/Auth';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user) {
          const userId = user.id;
          const response = await OrderService.getCustomerOrders(userId);
          setOrders(response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user]);

  const renderAssignedTo = (order) => {
    if (order.farmer_details) {
      return `${order.farmer_details.first_name} ${order.farmer_details.last_name}`;
    } else {
      return <button className="btn btn-primary" onClick={() => handleFindFarmer(order)}>Find</button>;
    }
  };

  const handleFindFarmer = (order) => {
    // Logic to handle finding farmer
    console.log('Find farmer for order:', order);
  };

  return (

    <div>
      <h3>My Orders</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Quantity Requested</th>
            <th>Delivery Date</th>
            <th>Status</th>
            <th>Delivered</th>
            <th>Paid</th>
            <th>Assigned To:</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.product_id.product_name}</td>
              <td>{order.quantity_requested} {order.product_id.unit}</td>
              <td>{order.delivery_date}</td>
              <td>{order.status}</td>
              <td>{order.delivered ? 'Yes' : 'No'}</td>
              <td>{order.paid ? 'Yes' : 'No'}</td>
              <td>{renderAssignedTo(order)}</td> {/* Render assigned to field */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default MyOrders;
