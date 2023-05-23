//@ts-nocheck
import { Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getProducts } from "../firebse/ProductsFirebase.tsx";


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



    return (
        <Container>
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
                                    const {id} = product.id;
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
                                        <NavLink to={'/product/0'} >
                                            <Button variant="contained">Editar</Button>
                                        </NavLink>
                                    </TableCell>
                                    <TableCell>
                                        <NavLink to={`/product/${id}`}>
                                         <Button variant="outlined">Eliminar</Button>
                                        </NavLink>
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