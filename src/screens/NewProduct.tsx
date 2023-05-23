//@ts-nocheck
import { Alert, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useForm from "../hooks/useForm.ts";
import {emptyProduct, Product} from '../interfaces/Product.ts';
import {addProduct, updateProduct} from '../firebse/ProductsFirebase.tsx'
import { useParams } from "react-router-dom";
import { getProduct } from '../firebse/ProductsFirebase.tsx'

function NewProduct (){
    

    const [formProduct, handleChange] = useForm(emptyProduct);

    const [ error, setError, setState ] = useState('');
    const [ success, setSuccess ] = useState('');

    const { id } = useParams()
    
    
    const { name, costOfSale, sellingPrice, stock } = formProduct; 

    const loadProduct = async(id) =>{
        
        if (id !== '0'){
            const product = await getProduct(id)
            setState(product)
        }
    }


    useEffect(() =>{
        loadProduct(id)
    }, [])


    const save = async () => {
        if (id === '0'){
            const result = await addProduct(formProduct);
            result ? setSuccess("Product added") : setError("Product not added");
        }else{
            const result = await updateProduct(formProduct);
            result ? setSuccess("Product updated!") : setError("Product not updated");
        }
      }
      
    return (
      <Container>
        <Grid container spacing={2} marginTop={3}>
          <Grid container>
            <Grid item md={4} sm={3} xs={0}></Grid>
            <Grid item md={4} sm={6} xs={12}>
            { success && <Alert severity="success">{success}</Alert>}
            { error && <Alert severity="error">{error}</Alert>}
              <Typography variant="h4">
                Add product
              </Typography>
            </Grid>
          </Grid>
          <Grid container marginTop={3}>
            <Grid item md={4} sm={3} xs={0}></Grid>
              <Grid item md={4} sm={6} xs={12}>
              <TextField type="text" name="name" value={name} onChange={handleChange} fullWidth={true} label="Name" variant="outlined" />
              <br/><br/>
              <TextField type="text" name="costOfSale" value={costOfSale} onChange={handleChange} fullWidth={true} label="costOfSale" variant="outlined" />
              <br/><br/>
              <TextField type="text" name="sellingPrice" value={sellingPrice} onChange={handleChange} fullWidth={true} label="SellingPrice" variant="outlined" />
              <br/><br/>
              <TextField type="text" name="stock" value={stock} onChange={handleChange} fullWidth={true} label="stock" variant="outlined" />
              <br/><br/>
              {id !=='0' ? <Button variant="outlined" onClick={save} >Update</Button> : <Button variant="outlined" onClick={save} >Save</Button>}
              </Grid>
            </Grid>
        </Grid>
      </Container>
    );

}

export default NewProduct