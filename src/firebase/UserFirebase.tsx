//@ts-nocheck
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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

export const loginUser = async(user : User) => {
    const {email, password} = user
    try{
        const result = (await signInWithEmailAndPassword(auth, email, password)).user
        localStorage.setItem("Email",result.email)
        return true
    } catch (err) {
        console.log(err)
        return false   
    }
}