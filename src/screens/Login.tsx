//@ts-nocheck
import React from "react";
import { emptyUser } from "../interfaces/User.ts";
import useForm from "../hooks/useForm.tsx";

function Login() {

    const {formUser, handleChange} = useForm(emptyUser)
    
    

}

export default Login