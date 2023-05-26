//@ts-nocheck
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SaleItem } from '../interfaces/Sale.ts';

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function calculateTotalPrice(saleItems: SaleItem[]): string {
    const totalPrice = saleItems.reduce(
      (accumulator, currentItem) => accumulator + currentItem.sellingPrice,
      0
    );
    return ccyFormat(totalPrice);
  }

function PreSaleTable( items : SaleItem[]) {
    console.log(typeof(items))
    if(!items || items.length === 0){
        return null
        
    }
  return (
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
          {items.map((item) => {
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
            <TableCell align="right">{calculateTotalPrice(items)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PreSaleTable