//@ts-nocheck
import { Alert, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useForm from "../hooks/useForm.ts";
import {emptyService, Service} from '../interfaces/Service.ts';
import {addService, updateService} from '../firebase/ServicesFirebase.tsx'
import { useParams, useNavigate } from "react-router-dom";
import { getService } from '../firebase/ServicesFirebase.tsx'

function NewService(){
    
    const navigate = useNavigate()
    const [formService, handleChange, setFormService] = useForm(emptyService);

    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');

    const { id } = useParams()
    
    
    const { name, costOfSale, sellingPrice } = formService; 

    const loadService = async (id) =>{
        if (id !== '0'){
            const service = await getService(id)
            setFormService(service.data())
        }
    }


    useEffect(() =>{
        loadService(id)
    }, [])


    const save = async () => {
      const result = await addService(formService);
      if(result){
        setSuccess("Service created!")
        setTimeout(() => {
          navigate('/services')
        }, [1500])
      } else {
        setError("Please check the service information");
      }
    }
    
    const update = async () => {
      const result = await updateService(id ,formService);
      if(result){
        setSuccess("Service updated!")
        setTimeout(() => {
          navigate('/services')
        }, [1500])
      } else {
        setError("Please check the service information");
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
                Add service
              </Typography>
            </Grid>
          </Grid>
          <Grid container marginTop={3}>
            <Grid item md={4} sm={3} xs={0}></Grid>
              <Grid item md={4} sm={6} xs={12}>
              <TextField type="text" name="name" value={name} onChange={handleChange} fullWidth={true} label="Name" variant="outlined" />
              <br/><br/>
              <TextField type="number" name="costOfSale" value={costOfSale} onChange={handleChange} fullWidth={true} label="costOfSale" variant="outlined" />
              <br/><br/>
              <TextField type="number" name="sellingPrice" value={sellingPrice} onChange={handleChange} fullWidth={true} label="SellingPrice" variant="outlined" />
              <br/><br/>
              {id !=='0' && <Button variant="outlined" onClick={update} >Update</Button>}
              {id ==='0' &&<Button variant="outlined" onClick={save} >Save</Button>}
              </Grid>
            </Grid>
        </Grid>
      </Container>
    );

}

export default NewService