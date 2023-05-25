//@ts-nocheck
import { Card, Typography, CardMedia, CardContent, CardActions, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import useForm from "../hooks/useForm.ts";
import { getProducts } from "../firebase/ProductsFirebase.tsx";
import { getServices } from "../firebase/ServicesFirebase.tsx";
import  useSales  from "../hooks/useSales.ts";

function Sales(){
    
    const [sales, addObjects] = useSales([])
    const [selected, handleChange] = useForm({id:0})

    useEffect(() => {
        getAll();
    }, [])
    useEffect(() => {
        console.log(selected)
    }, [selected])

    const getAll = async () => {
        const products = (await getProducts()).docs;
        const services = (await getServices()).docs;
        // console.log(products.docs[0].data())
        const productos = products.map((product) => {return product.data()})
        const servicios = services.map((service) => {return service.data()})
        addObjects(productos);
        addObjects(servicios);
        console.log(sales)
    }
    return (
    <Card sx={{ maxWidth: 500 }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Agrega tus productos o servicios favoritos
        </Typography>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selected}
                label="Age"
                onChange={handleChange}
            >
            {
                sales.map((object) => {
                    return(
                        <MenuItem value={object.id}>{object.name}</MenuItem>
                    )
                })
            }
            </Select>
        </FormControl>
      </CardContent>
      <CardActions>
        <Button size="small">Agregar</Button>
      </CardActions>
    </Card>
  );
}

export default Sales;