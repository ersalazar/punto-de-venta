//@ts-nocheck
import { useState } from "react"
import { Item, Sale, SaleItem, emptySale } from "../interfaces/Sale.ts";
import { getProduct } from "../firebase/ProductsFirebase.tsx";

const useSales = (initialState : SaleItem[]) => {
    const [salesState, setSalesState] = useState(initialState);
    
    const checkStock = async(id : string, quantity : number) : Promise<boolean> =>{
        try {
            const product = (await getProduct(id))?.data()
            
            if (product) {
                const {stock} = product
                if (quantity <= stock){
                    return true
                }
            }
            return false
            
        } catch (err) {
            console.log(err)
        }
        
        return false
    }
    
    console.log("inital salesState",salesState)

    const updateSaleItemQuantity = async ( 
        saleItems: SaleItem[],
        itemId: string,
        newQuantity: number,
        type :string
      ):  Promise<boolean> => {
        const itemToUpdate = saleItems.find((item) => item.id === itemId);
      
        if (!itemToUpdate) {
            return false;
        }
        
        const newQty = itemToUpdate.quantity + newQuantity;
        console.log('new qty', newQty)
        if (type !== 'product'){
            itemToUpdate.quantity = newQty
            setSalesState(saleItems)
            return true
            
        }
        console.log('entro a product', type)
        if (await checkStock(itemId, newQty)){
            itemToUpdate.quantity = newQty
            setSalesState(saleItems)
            return true
        }
        return true
      }

    const addObjects = async (newItem: SaleItem) => {
        console.log('addObjects', newItem)
        const newState : SaleItem[] = salesState
        const {id, name, type, quantity, sellingPrice} = newItem;

        const repeated = await updateSaleItemQuantity(newState, id, quantity, type)
        console.log('repeated', repeated)
        
        if (!repeated){
            if (type !== 'products') {
                newState.push({
                    id : id,
                    name : name, 
                    quantity : quantity,
                    sellingPrice : sellingPrice
                })
                console.log('item entrando a no repetido como servicio', newState)
                setSalesState(newState)
                return true
            }
            if (await checkStock(id, quantity)){
                console.log("no debe de entrar aqui si esta pasado", salesState)
                newState.push({
                    id : id,
                    name : name, 
                    quantity : quantity,
                    sellingPrice : sellingPrice
                })
                // console.log(newState)
                setSalesState(newState)
                return true
            }
            
        }
        console.log('item repetido, debe de sumar o quedarse igual', salesState)
        return false
        
    }
    return [
        salesState,
        addObjects,
        setSalesState
    ];
}

export default useSales;