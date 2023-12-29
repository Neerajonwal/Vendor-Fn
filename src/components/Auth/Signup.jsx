import { Box, Paper, Typography } from '@mui/material'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import HomeIcon from '@mui/icons-material/Home';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { vendorRegisterHandler } from '../../services/api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

//!Regex pattern 
export const PHONE_PATTERN=/^\d{10}$/
export const USERNAME_PATTERN=/^[a-zA-Z][a-zA-Z0-9]+$/

export const PASSWORD_PATTERN=/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$%^&+=!()]).{6,10}$/
const validationSchema = Yup.object({
  userName: Yup.string()
    .required("User name is required.")
    .matches(USERNAME_PATTERN, "User name must contain letters"),

  email: Yup.string()
    .required("Email is required")
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"),

  password: Yup.string()
    .required("Password is required")
    .matches(/^[a-zA-z0-9].{6,10}$/
    , "Password must contain letters and numbers of minimum 6 characters"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),

  address: Yup.string() .required("Address is required")
    .matches(/^[a-zA-z0-9]/, "Address must contain letters with numbers"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit,formState:{errors} } = useForm({
    resolver:yupResolver(validationSchema)
   
  });
  const navigate=useNavigate()
  console.log('form errors',errors)

   const onSubmitHandler = async (formData)=>{
    try {
      const vendorReqBody={
        ...formData,
        userID:"MU"+(Math.floor(Math.random() * 1000000)),
       }
       const {data}= await vendorRegisterHandler(vendorReqBody);
       console.log('new vendor',data)
       if(data.status==='success'){
        toast.success("Registrations successfull.Please wait for admin response")
        setTimeout(() =>{
        navigate('/login')
        },
        600)
       }
       else{
        toast.error("Something went wrong.Please try again")
       }
       
     
    } catch (error) {

      console.log('error',error)
    }
      
   }

  return (
   <>
    <Paper  elevation={3} sx={{ width:{sm:'100%',md:'500px',lg:'500px',xl:'500px'},height:'auto',p:'2rem' }}>

    <form onSubmit={handleSubmit(onSubmitHandler)} >
     <Controller
     name='userName'
     control={control}
     render={({field})=> <TextField
     {...field}
     fullWidth
     margin="normal"
     label="Username"
     error={errors?.userName?.message && true}
     helperText={errors?.userName?.message && errors?.userName?.message}
    //  value={fi}
     InputProps={{
       endAdornment: <AccountCircle />,
     }}
   />}
     />
      <Controller
      name='email'
      control={control}
      render={({field})=> <TextField
      {...field}
      fullWidth
      margin="normal"
      label="Email"
      error={errors?.email?.message && true}
     helperText={errors?.email?.message && errors?.email?.message}
      InputProps={{
        endAdornment: <EmailIcon />,
      }}
    />}
      />
     <Controller
     name="password"
     control={control}
     render={({field})=> <TextField
     {...field}
     fullWidth
     margin="normal"
     label="Password"
     type="password"
     error={errors?.password?.message && true}
     helperText={errors?.password?.message && errors?.password?.message}
    
     InputProps={{
       endAdornment: <Lock />,
     }}
   />}
     />
      <Controller
      name='phoneNumber'
      control={control}
      render={({field})=><TextField
      {...field}
      fullWidth
      margin="normal"
      label="Phone Number"
      error={errors?.phoneNumber?.message && true}
     helperText={errors?.phoneNumber?.message && errors?.phoneNumber?.message}
      InputProps={{
        endAdornment: <ContactPhoneIcon />,
      }}
    />}
      
      />
      <Controller
      name='address'
      control={control}
      render={({field})=> <TextField
      {...field}
      fullWidth
      margin="normal"
      label="Address"
      error={errors?.address?.message && true}
     helperText={errors?.address?.message && errors?.address?.message}
      InputProps={{
        endAdornment: <HomeIcon />,
      }}
    />}
      />
      <Button 
      
      sx={{mt:".5rem"}} fullWidth type="submit" size='large' variant="contained" color="warning">
        Signup
      </Button>
    </form>
    <Typography sx={{mt:'1rem'}}>
      Allready have an account?<Link to={'/login'}>Login</Link>
    </Typography>
    </Paper>
   </>
  );
};

export default Signup;
