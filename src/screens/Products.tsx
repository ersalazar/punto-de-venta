//@ts-nocheck
import { Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { deleteProduct, getProducts } from "../firebase/ProductsFirebase.tsx";


function Products() {
    const [ products, setProducts ] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);


    useEffect(() => {
        loadProducts();
    }, [])

    const loadProducts = async () => {
        const products  = await getProducts();
        console.log("use effect", products.docs)
        setProducts(products.docs)
    }

    const deleteProducts = async (id: string) => {
        await deleteProduct(id)
        loadProducts()
    }



    return (
        <Container>
            <NavLink to='/products/0' className='btn btn-primary mt-5'> Agregar nuevo producto</NavLink>
            <Grid container spacing={2} marginTop={3}>
                <Grid item>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Cost of Sale</TableCell>
                                <TableCell align="right">Selling Price</TableCell>
                                <TableCell align="right">Stock</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                products.map((product) => {
                                    const {name, costOfSale, sellingPrice, stock} = product.data();
                                    const id = product.id;
                                    return(
                                        <TableRow
                                        key={id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="product">
                                            {name}
                                        </TableCell>
                                        <TableCell align="right">{costOfSale}</TableCell>
                                        <TableCell align="right">{sellingPrice}</TableCell>
                                        <TableCell align="right">{stock}</TableCell>
                                        <TableCell>
                                            <NavLink to={`/products/${id}`} >
                                                <Button variant="contained">Editar</Button>
                                            </NavLink>
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => deleteProducts(id)} variant="outlined" >Eliminar</Button>
                                        </TableCell>
                                        </TableRow>
                                    );
                                })
                             }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    )




}

export default Products