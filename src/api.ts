import axios from "axios";
//import { Redirect } from 'react-router';
//import { Navigate } from "react-router-dom";
//import { useState } from 'react';

const instance = axios.create({
  baseURL: "http://localhost:9999/api/v1/auth/",
  // baseURL: "http://13.124.111.141:8089/api/v1/auth/",
  headers: {
    "Content-Type" : "application/json",
  },
});

let alertShown = false;

function showAlert(message: string) {
  
  //const [alertShown, setAlertShown] = useState(false);
  
  //console.log("alertShown", alertShown);
  
  if (!alertShown) {
    
    alert(message);
    //setAlertShown(true);
    alertShown = true;
    setTimeout(() => {
      //setAlertShown(false);
      alertShown = false;
    }, 3500); // 5초 후에 alertShown을 다시 false로 설정
  }
  
  //return (<></>);
}

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    
    //console.log("accessToken 1", accessToken);
    
    if (accessToken) {
      config.headers["Authorization"] = 'Bearer ' + accessToken;  // for Spring Boot back-end
      //config.headers.Authorization = `Bearer ${accessToken}`; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    
    //console.log("err", err);
    
    let refreshToken = localStorage.getItem("refreshToken");
    
    let errMsg = err.response?.data;
    let errStatus = err.response?.status;
    
    if (errStatus == 401 && errMsg == "Refresh Token Expired") {
      //alert("토큰이 만료되었습니다. 다시 로그인해 주시기 바랍니다.");
      showAlert("토큰이 만료되었습니다. 다시 로그인해 주시기 바랍니다.");
      //return <Redirect to = {{ pathname: "/login" }} />;
      //return (
        //<Navigate to="/login" replace={true} />
      //)
      location.href = "/login";
      return Promise.reject(err);
    }
    
    if (!refreshToken) {
      showAlert("로그인해 주시기 바랍니다.");
      location.href = "/login";
      return Promise.reject(err);
    }
    
    if (errStatus == 403) {
      showAlert("권한이 없습니다.");
    }
    
    const originalConfig = err.config;
	
    //console.log("originalConfig", originalConfig);
    //console.log("originalConfig.url", originalConfig.url);
    

    if (originalConfig?.url !== "login" && err.response) {
      // Access Token was expired
      if (err.response?.status === 401 && !originalConfig._retry) {
		  
        originalConfig._retry = true;

        try {
	  
	        let url = "refresh?refreshToken=" + refreshToken;
	  
          const rs = await instance.get(url);

          const accessToken = rs.data;
	  
	        //console.log("newAccessToken", accessToken);
	  
	        localStorage.setItem("accessToken", accessToken);
          
	        originalConfig.headers["Authorization"] = 'Bearer ' + accessToken;  // for Spring Boot back-end
          //originalConfig.headers.Authorization = `Bearer ${accessToken}`;
          
          return instance(originalConfig);
		  
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
