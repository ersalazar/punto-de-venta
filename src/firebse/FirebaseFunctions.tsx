//@ts-nocheck
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from './credentials.ts'


export const createUser = async  ( user : User) => {

    const {email, password} = user

    try{
        const result = await createUserWithEmailAndPassword(auth, email, password);
        return result.user
    }catch(error){
        return error
    }
}