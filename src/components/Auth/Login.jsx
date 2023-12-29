import { Box, Paper, Typography } from '@mui/material'
import React from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { AccountCircle, ContactlessOutlined, Lock } from '@mui/icons-material';
import { Controller, useForm } from "react-hook-form";
import { vendorLoginHandler } from '../../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();

  const onSubmitHandler = async (formData) => {

    console.log(formData)
    try {
      const LoginData = await vendorLoginHandler(formData);

      console.log(LoginData)
      // console.log('logged vendor',LoginData.data , LoginData.data.token);
      if (LoginData.status === 200) {
        if(LoginData.data.token){
          console.log("ritesh" )
          localStorage.setItem("apiAccessTken" , LoginData.data.token)
        }


        // Handle success scenario
        toast.success(LoginData.data.message)
        console.log("Success")
      } else {
        toast.error(LoginData.message);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <Paper elevation={3} sx={{ width: { sm: '100%', md: '500px', lg: '500px', xl: '500px' }, maxHeight: '250px', p: '2rem' }}>

        <form onSubmit={handleSubmit(onSubmitHandler)} >
          <Controller
            name='userName'
            control={control}
            render={({ field }) => <TextField
              {...field}
              fullWidth
              margin="normal"
              label="User ID"
              InputProps={{
                endAdornment: <AccountCircle />,
              }}
            />}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => <TextField
              {...field}
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              InputProps={{
                endAdornment: <Lock />,
              }}
            />}
          />
          <Button sx={{ mt: ".5rem" }} fullWidth type="submit" size='large' variant="contained" color="warning">
            Login
          </Button>
        </form>
        <Typography sx={{ mt: '1rem' }}>
          Create a new account?<Link to={'/signup'}>Apply Here</Link>
        </Typography>
      </Paper>
    </>
  );
};

export default Login;
