//@ts-nocheck
import React from "react";
import { emptyUser } from "../interfaces/User.ts";
import useForm from "../hooks/useForm.ts";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

function Login() {

    const [formUser, handleChange] = useForm(emptyUser);    
    const {email, password} = formUser

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <h1>
                Punto de venta
            </h1>
          <TextField label="Email" variant="outlined" margin="normal"   name="email" onChange={handleChange} value={email}/>
          <TextField label="Password" variant="outlined" margin="normal"  type="password" name="password" onChange={handleChange} value={password}/>
          <Button variant="contained" color="primary" >
            Login
          </Button>
          <NavLink to={`/register`}>
            Don't have an account? Register here.
          </NavLink>
        </Box>
    )
}
export default Login