//@ts-nocheck
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc} from "firebase/firestore"
import { db } from "./credentials.js"
import { Service } from "../interfaces/Service.ts"

const ServiceCollection = collection(db, 'services')

export const addService = async (Service : Service) => {
    try {
        await addDoc(ServiceCollection, Service)
        return true
    }catch (err) {
        console.log(err)
        return false
    }
}

export const getServices = async () =>{
    const result = await getDocs(ServiceCollection)
    return result
}

export const deleteService = async (id) => {
    const docRef = doc(db, 'services', id)
    try{
        await deleteDoc(docRef)
        console.log('deleted')
        return true
    }catch(error){
        console.log(error)
        return false
    }

};

export const getService = async (id) => {
    const docRef = doc(db, 'services', id)
    try{
        const Service = await  getDoc(docRef);
        return Service.data()
    } catch (error) {
        console.log(error)
    }
    return 
};

export const updateService = async (id, data : Service) => {
    const docRef = doc(db, 'services', id)
    try{
        await  updateDoc(docRef, data);
        return true
    } catch (error) {
        console.log(error)
    }
    return 
};