export interface SaleItem {
    id : string,
    name :string,
    quantity : number,
    sellingPrice : number,
    type : string,

}

export interface Item {
    id: string,
    name : string,
    type : string,
    sellingPrice: number,
    quantity : number,
}

export interface Sale {
    items : string[],
    quantities : number[],
    sellingPrices : number[],
    total : number,
    date : Date,
}

export const emptySale  = {
    items  : [],
}