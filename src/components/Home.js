import {
    Typography, Box, makeStyles, Grid,TextField, Button} from "@material-ui/core"
import { deepPurple, green,} from '@material-ui/core/colors';

import List from "./students/List";
import axios from "axios";
import { useState } from "react";





const useStyles = makeStyles({
    headingColor: {
        backgroundColor: deepPurple[400],
        color: 'white'
    },
    addstudcolor: {
        backgroundColor: green[400],
        color: 'white'
    }
})

const Home = () => {
    const Classes = useStyles();
    const [student,setStudent]= useState({
        name: "",
        email: ""
    });
 const [status,setStatus]=useState()
    function onTextFieldChange(e){
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
    }

     async function onFormSubmit(e){
        e.preventDefault()
        try{
         await axios.post(`http://localhost:3002/students`,student)
         setStatus(true);
           
        } catch (error){
            console.log("something is wrong")
        }
    }

    if (status){

        return <Home/>
    }
    return (
        <>
            <Box textAlign="center" className={Classes.headingColor} p={2} mb={3} >
                <Typography variant="h2"> React CRUD API </Typography>
            </Box>
            <Grid container justify="center" spacing={2}>
                <Grid item md={6} xs={12}>
                    <Box textAlign="center" p={2} className={Classes.addstudcolor} mb={2}>
                        <Typography variant="h4">Add Students</Typography>
                    </Box>
                    <form noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField autoComplete="name" name="name" variant="outlined" required fullWidth id="name" label="Name"  
                                onChange={e=>onTextFieldChange(e)}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" 
                                 onChange={e=>onTextFieldChange(e)}
                                />
                            </Grid>
                        </Grid>
                        <Box m={3}>
                            <Button type="submit" variant="contained" color="primary" fullWidth  onClick={e=>onFormSubmit(e)}>ADD</Button>
                        </Box>
                    </form>
                </Grid>
                <Grid item md={6} xs={12}>
                    <List/>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;