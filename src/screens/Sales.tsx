//@ts-nocheck
import { Card, Typography, CardMedia, CardContent, CardActions, Button, FormControl, InputLabel, Select, MenuItem, Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import useForm from "../hooks/useForm.ts";
import { buyProduct, getProducts } from "../firebase/ProductsFirebase.tsx";
import { getServices } from "../firebase/ServicesFirebase.tsx";
import  useSales  from "../hooks/useSales.ts";
import { Item, SaleItem } from "../interfaces/Sale.js";
import PreSaleTable from "../components/preSaleTable.tsx";
import { addSale } from "../firebase/SalesFirebase.tsx";

function Sales() {
  const [products, setProducts] = useState<Item[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState('')

  const [salesState, addObjects, setSalesState] = useSales<SaleItem[]>([]);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const products = (await getProducts()).docs;
    const services = (await getServices()).docs;

    const productsAndServices = products.concat(services);
    const productsId = products.map((product) => product.id);

    const salesItems = productsAndServices.map((item) => ({
      id: item.id,
      name: item.data().name,
      type: productsId.includes(item.id) ? 'products' : 'services',
      sellingPrice: item.data().sellingPrice
    }));

    setProducts(salesItems);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProductId(event.target.value);
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddButtonClick = async () => {
    const selectedProduct = products.find((product) => product.id === selectedProductId);
    if (selectedProduct) {
      const {id, name, sellingPrice, type} = selectedProduct
      const saleItem: SaleItem = {
        id: id,
        name: name,
        quantity: quantity,
        sellingPrice: sellingPrice,
        type : type
      };
      console.log("quantity",quantity)
      const added = await addObjects(saleItem);
      console.log('added', added)
      if (!added){
        setError('No contamos con suficiente inventario')
      } else {
        setError('')
      }
      //console.log('Sale item added:', saleItem);
      
    }
  };
  function ccyFormat(num: number) {
    return `$${num.toFixed(2)}`;
  }
  
  function calculateTotalPrice(saleItems: SaleItem[]): number {
    const totalPrice = saleItems.reduce(
      (accumulator, currentItem) => accumulator + currentItem.sellingPrice * currentItem.quantity,
      0
    );
    return ccyFormat(totalPrice);
  }

  const buyProducts = async (saleItems : SaleItem[]) => {
    const items: string[] = [];
    const quantities: number[] = [];
    const sellingPrices: number[] = [];
    let total = 0;
    // Iterate over the saleItems array
      try{
        saleItems.forEach(saleItem  => {
        const { id, quantity, sellingPrice, type } = saleItem;
        const itemKey = `${type}/${id}`;
        items.push(itemKey);
        quantities.push(quantity);
        sellingPrices.push(sellingPrice);

        total += quantity * sellingPrice;
      
      })

      const date = new Date(); // Current date and time

      const sale: Sale = {
        items,
        quantities,
        sellingPrices,
        total,
        date,
      };

      const result = await addSale(salesState)

      if (result){
        setSuccess('Compra realizada!')
        setSalesState([])

      }
    }catch(err){
      console.log(err)
    }

  }
  return (
    <Container className="container">
      { error && <Alert severity="error">{error}</Alert>}
      { success && <Alert severity="success">{error}</Alert>}
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Producto o servicio</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedProductId}
              label="Age"
              onChange={handleSelectChange}
            >
              {products.map((object) => (
                <MenuItem key={object.id} value={object.id}>
                  {object.name}
                </MenuItem>
              ))}
            </Select>
            <label className="form-label" htmlFor="qty">
              Quantity
            </label>
            <input
              type="number"
              id="qty"
              className="form-control"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </FormControl>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleAddButtonClick}>
            Agregar
          </Button>
        </CardActions>
      </Card>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Product or servive</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesState.map((item) => {
            const {id, name, quantity, sellingPrice} = item
            const productSubtotal = quantity * sellingPrice
           return(
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell align="right">{quantity}</TableCell>
              <TableCell align="right">{sellingPrice}</TableCell>
              <TableCell align="right">{ccyFormat(productSubtotal)}</TableCell>
            </TableRow>
          )})}
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell></TableCell>
            <TableCell align="right">{calculateTotalPrice(salesState)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <Button className="btn btn-info mx-2" onClick={buyProducts}>Comprar</Button>
    </Container>
  );
}

export default Sales;