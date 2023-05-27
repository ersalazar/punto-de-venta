//@ts-nocheck
import { Button } from '@mui/material';
import { typeImplementation } from '@testing-library/user-event/dist/type/typeImplementation';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getProduct } from '../firebase/ProductsFirebase.tsx';
import { getSales } from '../firebase/SalesFirebase.tsx';
import {getService} from '../firebase/ServicesFirebase.tsx';

function Sales() {
  const [sales, setSales] = useState([]);
  const [names, setNames] = useState<string[]>([]);

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

  useEffect(() => {
    const getAndSetNames = async() => {

      const names = await getNames(sales)
      setNames(names)
  }
  getAndSetNames()

  }, [sales])

  const getNames = async (saleData) => {
    try {
      const names  : string[] = []
      saleData.forEach(sale => {
        const refs = sale.items;
        refs.forEach ( async ref => {
          const product = ref.split('/')
          const type = product[0]
          const id  = product[1]
          console.log('ID', id)
          console.log('TYPE', typeImplementation)
          let name
          if (type ==='products'){
              name = (await getProduct(id)).data().name
          }
          else {
            name = (await getService(id)).data().name
          }

          if(name) {
            names.push(name)
          }
        });
        console.log('NAMES',names)
      }) 
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
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
            console.log('names', names)
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
      <NavLink classNmae='btn btn-info mx-2' to={'/newSale'}>Agregar venta</NavLink>
    </div>
  );
}

export default Sales;
