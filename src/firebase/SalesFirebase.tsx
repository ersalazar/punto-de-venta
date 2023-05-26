//@ts-nocheck
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc} from "firebase/firestore"
import { db } from "./credentials.ts"
import { Sale } from "../interfaces/Sale.ts"


const SaleCollection = collection(db, 'sales')

export const addSale = async (Sale : Sale) => {
    try {
        await addDoc(SaleCollection, Sale)
        return true
    }catch (err) {
        console.log(err)
        return false
    }
}

export const getSales = async () =>{
    const result = await getDocs(SaleCollection)
    return result
}

export const deleteSale = async (id) => {
    const docRef = doc(db, 'sales', id)
    try{
        await deleteDoc(docRef)
        console.log('deleted')
        return true
    }catch(error){
        console.log(error)
        return false
    }

};

export const getSale = async (id) => {
    const docRef = doc(db, 'sales', id)
    try{
        const Sale = await  getDoc(docRef);
        return Sale
    } catch (error) {
        console.log(error)
    }
    return 
};

