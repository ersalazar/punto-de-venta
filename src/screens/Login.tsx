//@ts-nocheck
import React, { useState } from "react";
import { emptyUser } from "../interfaces/User.ts";
import useForm from "../hooks/useForm.ts";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../firebase/UserFirebase.tsx';
import Alert from '@mui/material/Alert';


function Login() {

    const [formUser, handleChange] = useForm(emptyUser);    
    const {email, password} = formUser
    const [error, setError] = useState('')
    const navigate = useNavigate(); 

    const loginClick = async () => {
      const response = await loginUser(formUser) 
        if (response){
          navigate('/sales')
        }
        else{
            setError('Incorrect email or password, try again')
            setTimeout(() => {
              setError('')
          }, [1500])
        }
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            { error && <Alert severity="error">{error}</Alert>}
            <h1>
                Punto de venta
            </h1>
          <TextField label="Email" variant="outlined" margin="normal"   name="email" onChange={handleChange} value={email}/>
          <TextField label="Password" variant="outlined" margin="normal"  type="password" name="password" onChange={handleChange} value={password}/>
          <Button onClick={loginClick} variant="contained" color="primary" >
            Login
          </Button>
          <NavLink to={`/register`}>
            Don't have an account? Register here.
          </NavLink>
        </Box>
    )
}
export default Login