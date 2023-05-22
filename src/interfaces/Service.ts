
export interface Service {
    name : string, 
    sellingPrice : number,
    costOfSale : number, 
}

export const emptyService : Service = {
    name : '',
    sellingPrice : 0,
    costOfSale : 0
}