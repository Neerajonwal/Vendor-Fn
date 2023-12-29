import axios from "axios";

export const vendorLoginHandler= async(data)=>{
    let loginData = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`,data)

    //console.log(loginData , "Ritesh")
    return loginData
}
export const vendorRegisterHandler= async(data)=>{
    return  axios.post(`${process.env.REACT_APP_API_URL}api/vender/registerUser`,data);

};