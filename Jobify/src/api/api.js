import axios from 'axios';

const BASE_URL = 'https://jobify-backend-production.up.railway.app/api';       

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const fetchUserByEmail = (email, token) => {
  return fetch(`${BASE_URL}/user/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const setUserRole = (email, role, token) => {
  return fetch(`${BASE_URL}/set-role`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email, role }),
  });
};

export const fetchMyApplications = (email, token) => {
  return fetch(`${BASE_URL}/my-applications/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchJobApplicants = (email, token) => {
  return fetch(`${BASE_URL}/job-applicants/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const applyToJob = (userId, jobId) => {
  return apiClient.post(`/user/${userId}/apply/${jobId}`);
};

export const fetchAllJobs = () => {
  return fetch(`${BASE_URL}/jobs`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const loginUser = (formData) => {
  return apiClient.post('/login', formData);
};

export const fetchPostedJobs = (userId) => {
  return apiClient.get(`/jobs/posted/${userId}`);
};

export const postNewJob = (jobData) => {
  return fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobData),
  });
};

export const registerUser = (formData) => {
  return apiClient.post('/register', formData);
};

export const fetchApplicants = (jobId) => {
  return fetch(`${BASE_URL}/jobs/${jobId}/applicants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteJob = async (jobId) => {
  return await axios.delete(`/jobs/${jobId}`);
};

export const updateJob = async (jobId, jobData) => {
  return await axios.put(`/jobs/${jobId}`, jobData);
};

export default apiClient;













// import { myAxios } from "../utils/user-service";

// export const loginApi = async(values)=>{
//     try {
//         console.log("loginApi:",values);
//         const res = await myAxios.post('/login',values);
//         const token = res.headers['authorization'];
//         if(res.data.statusCode==200 && token){
//             localStorage.setItem("authToken",token)
//             localStorage.setItem("email",values.email)
//             localStorage.setItem("userRole" , res.data.data.role)
//             console.log(res.data.data.role,"res.role");
            
//             console.log(res.data);
//             console.log(token);
//             myAxios.defaults.headers.common['authorization'] = token;
//         }
//         console.log(res);
//         return res.data;
//     } catch (error) {
//         return error.response.data;
//     }
// }

// export const signUpApi = async(values)=>{
//     try {
        
//         const res = await myAxios.post('/register',values);
//         console.log(res);
//         return res.data;
//     } catch (error) {
//         return error.response.data;
//     }
// }
// export const verifyEmailApi = async(token)=>{
//         try {
//             console.log("in verify email api : ", typeof token);
//             const res = await myAxios.post(`/verify`,{otp:token});
//             if(res.data.statusCode==200 && token){
//                 localStorage.setItem("authToken",token)
//                 myAxios.defaults.headers.common['authorization'] = token;
//             }
//             console.log(res);
//             return res.data;
//         } catch (error) {
//             console.log(error);
//             return error.response.data
//         }
// }

// export const resendEmail = async()=>{
//     try {
//         const res = await myAxios.post('/resend-email',{email:JSON.parse(localStorage.getItem("userEmail"))})
//         return res.data;
//     } catch (error) {
//         return error.response.data;
//     }
// }

