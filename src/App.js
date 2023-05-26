import logo from './logo.svg';
import './App.css';
import Login from '../src/screens/Login.tsx'
import Products from './screens/Products.tsx';
import NewUser from './screens/NewUser.tsx';
import Services from './screens/Services.tsx';
import NewProduct from './screens/NewProduct.tsx';
import NewService from './screens/NewService.tsx';
import ResponsiveAppBar from './components/ResponsiveAppBar.tsx';
import NewSale from './screens/NewSale.tsx';
import Sales from './screens/Sales.tsx';
import {Route, BrowserRouter, Routes, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';

function App() {
  const [isLogged,setIsLogged] = useState();
  const logged = () => {
    const logged = localStorage.getItem("Email") || null;
    if(logged !== null){
      setIsLogged(true)
    }
    else{
      setIsLogged(false)
    }
  }
  useEffect(() => {
    logged()
  }, [])

  return (
    <BrowserRouter>
        {!isLogged ? (
          <Routes>
            <Route path='/' element={<Login setIsLogged={setIsLogged}/>}/>
          </Routes>
        ) : 
        (
          <>
          <ResponsiveAppBar />
          <Routes>  
            <Route exact path='/' element={<Sales/>}/>
            <Route path='/register' element={<NewUser/>}/>
            <Route path='/products/' element={<Products/>}/>
            <Route path='/products/:id' element={<NewProduct/>}/>
            <Route path='/services/' element={<Services/>}/>
            <Route path='/services/:id' element={<NewService/>}/>
            <Route path='/newSale/' element={<NewSale/>}/>
            <Route path='/sales/' element={<Sales/>}/>
          </Routes>
          </>
        )}
    </BrowserRouter>
  );
}

export default App;
