import { myAxios } from "../utils/user-service";

export const loginApi = async(values)=>{
    try {
        console.log("loginApi:",values);
        const res = await myAxios.post('/login',values);
        const token = res.headers['authorization'];
        if(res.data.statusCode==200 && token){
            localStorage.setItem("authToken",token)
            localStorage.setItem("email",values.email)
            localStorage.setItem("userRole" , res.data.data.role)
            console.log(res.data.data.role,"res.role");
            
            console.log(res.data);
            console.log(token);
            myAxios.defaults.headers.common['authorization'] = token;
        }
        console.log(res);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const signUpApi = async(values)=>{
    try {
        
        const res = await myAxios.post('/register',values);
        console.log(res);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
export const verifyEmailApi = async(token)=>{
        try {
            console.log("in verify email api : ", typeof token);
            const res = await myAxios.post(`/verify`,{otp:token});
            if(res.data.statusCode==200 && token){
                localStorage.setItem("authToken",token)
                myAxios.defaults.headers.common['authorization'] = token;
            }
            console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
            return error.response.data
        }
}

export const resendEmail = async()=>{
    try {
        const res = await myAxios.post('/resend-email',{email:JSON.parse(localStorage.getItem("userEmail"))})
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

