import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import Login from '../src/screens/Login.tsx'
import Products from './screens/Products.tsx';
import NewUser from './screens/NewUser.tsx';
import Services from './screens/Services.tsx';
import NewProduct from './screens/NewProduct.tsx';
import NewService from './screens/NewProduct.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Products />
      <Services />
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<NewUser/>}/>
        <Route path='/product/:id' element={<NewProduct/>}/>
        <Route path='/service/:id' element={<NewService/>}/>
      </Routes>
      
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
