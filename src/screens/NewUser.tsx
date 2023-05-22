//@ts-nocheck
import React, { useState } from "react";
import { emptyUser } from "../interfaces/User.ts";
import useForm from "../hooks/useForm.ts";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { NavLink } from 'react-router-dom';
import { createUser } from "../firebse/FirebaseFunctions.tsx";

function NewUser() {

    const [formUser, handleChange] = useForm(emptyUser);    
    const {email, password} = formUser
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    async function newUser() {
        const response = await createUser(formUser) 

        if (response.email){
            setSuccess(`User Created Succesfully with email: ${response.email}!`)
            setError('')
        }
        else{
            setError(`${response.code} - ${response.message}`)
            setSuccess('')
        }
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">

            { success && <Alert severity="success">{success}</Alert>}
            { error && <Alert severity="error">{error}</Alert>}
            <h1>
                Punto de venta
            </h1>
          <TextField label="Email" variant="outlined" margin="normal"   name="email" onChange={handleChange} value={email}/>
          <TextField label="Password" variant="outlined" margin="normal"  type="password" name="password" onChange={handleChange} value={password}/>
          <NavLink variant="contained" color="primary" className="btn btn-info mx-2"  onClick={newUser}>
            Register
          </NavLink>
          <NavLink to={`/`}>
            Already have an account? Sign in here.
          </NavLink>
          
        </Box>
    )
}
export default NewUser