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
import NewService from './screens/NewService.tsx';
import Sales from './screens/Sales.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route path='/register' element={<NewUser/>}/>
        <Route path='/products/' element={<Products/>}/>
        <Route path='/products/:id' element={<NewProduct/>}/>
        <Route path='/services/' element={<Services/>}/>
        <Route path='/services/:id' element={<NewService/>}/>
        <Route path='/sales/' element={<Sales/>}/>
      </Routes>
      
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
