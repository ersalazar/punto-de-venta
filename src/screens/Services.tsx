//@ts-nocheck
import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getServices } from "../firebse/ServicesFirebase.tsx";

function Services() {
  const [services, setServices] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const services = await getServices();
    console.log("use effect", services.docs);
    setServices(services.docs);
  };

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
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((product) => {
                  const { name, costOfSale, sellingPrice } = product.data();
                  const { id } = product;
                  return (
                    <TableRow
                      key={id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="product">
                        {name}
                      </TableCell>
                      <TableCell align="right">{costOfSale}</TableCell>
                      <TableCell align="right">{sellingPrice}</TableCell>
                      <TableCell>
                        <NavLink to={"/"}>
                          <Button variant="contained">Editar</Button>
                        </NavLink>
                      </TableCell>
                      <TableCell>
                        <Button variant="outlined">Eliminar</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Services;
