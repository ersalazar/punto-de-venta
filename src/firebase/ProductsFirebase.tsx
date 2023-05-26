//@ts-nocheck
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc} from "firebase/firestore"
import { db } from "./credentials.ts"
import { Product } from "../interfaces/Product.js"

const productCollection = collection(db, 'products')

export const addProduct = async (product : Product) => {
    try {
        await addDoc(productCollection, product)
        return true
    }catch (err) {
        console.log(err)
        return false
    }
}

export const getProducts = async () =>{
    const result = await getDocs(productCollection)
    return result
}

export const deleteProduct = async (id) => {
    const docRef = doc(db, 'products', id)
    try{
        await deleteDoc(docRef)
        console.log('deleted')
        return true
    }catch(error){
        console.log(error)
        return false
    }

};

export const getProduct = async (id) => {
    const docRef = doc(db, 'products', id)
    try{
        const product = await  getDoc(docRef);
        return product
    } catch (error) {
        console.log(error)
    }
    return 
};

export const updateProduct = async (id, data : Product) => {
    const docRef = doc(db, 'products', id)
    try{
        await  updateDoc(docRef, data);
        return true
    } catch (error) {
        console.log(error)
    }
    return 
};

export const buyProduct = async (id, quantity) => {
    try{
        const item = await getProduct(id);
        const {stock} = item
        const updated = {
            ...item,
            stock : stock - quantity
        }
        await updateProduct(id, updated)
        return
    }catch(err){
        console.log(err)
    }
};