//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { getSales } from '../firebase/SalesFirebase.tsx';

function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const data = await getSales();
      setSales(data.docs);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  const formatDate = (dateObject) => {
    const date = dateObject.toDate();
    return date.toLocaleString(); // Adjust the formatting as per your preference
  };

  return (
    <div className="container mt-4">
      <h1>Sales</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Products</th>
            <th>Quantities</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => {
            const id = sale.id;
            const { items, quantities, date, total } = sale.data();

            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{items.join(', ')}</td>
                <td>{quantities.join(', ')}</td>
                <td>{formatDate(date)}</td>
                <td>{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;
