import logo from './logo.svg';
import './App.css';
import AllRoutes from './AllRoutes/AllRoutes';
import Navbar from './components/Header/Navbar';
import { Container } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
   <>
   <Navbar/>
   <Container maxWidth='lg' sx={{height:'auto',display:'grid',placeItems:'center',p:'2rem'}}>
    <AllRoutes/>
   </Container>
   <ToastContainer/>
   </>
  );
}

export default App;
