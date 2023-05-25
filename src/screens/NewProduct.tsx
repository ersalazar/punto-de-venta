//@ts-nocheck
import { Alert, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useForm from "../hooks/useForm.ts";
import {emptyProduct, Product} from '../interfaces/Product.ts';
import {addProduct, updateProduct} from '../firebase/ProductsFirebase.tsx'
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from '../firebase/ProductsFirebase.tsx'

function NewProduct (){
    
    const navigate = useNavigate()
    const [formProduct, handleChange, setFormProduct] = useForm(emptyProduct);

    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');

    const { id } = useParams()
    
    
    const { name, costOfSale, sellingPrice, stock } = formProduct; 

    const loadProduct = async (id) =>{
        if (id !== '0'){
            const product = await getProduct(id)
            setFormProduct(product.data())
        }
    }


    useEffect(() =>{
        loadProduct(id)
    }, [])


    const save = async () => {
      const result = await addProduct(id ,formProduct);
      if(result){
        setSuccess("Product updated!")
        setTimeout(() => {
          navigate('/products')
        }, [1500])
      } else {
        setError("Please check the product information");
      }
    }
    
    const update = async () => {
      const result = await updateProduct(id ,formProduct);
      if(result){
        setSuccess("Product updated!")
        setTimeout(() => {
          navigate('/products')
        }, [1500])
      } else {
        setError("Please check the product information");
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
              {id !=='0' ? <Button variant="outlined" onClick={update} >Update</Button> : <Button variant="outlined" onClick={save} >Save</Button>}
              </Grid>
            </Grid>
        </Grid>
      </Container>
    );

}

export default NewProduct