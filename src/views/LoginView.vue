<script lang="ts" setup>

import { ref } from 'vue';
import axios from 'axios';
import { reactive } from 'vue';

const loginEmail = ref<string>("");
const loginPass = ref<string>("");

const defaultLoginInfo = {
  email: "",
  password: "",
}

const loginInfo = reactive(defaultLoginInfo);


async function loginProcess() {
  
  loginInfo.email = loginEmail.value;
  loginInfo.password = loginPass.value;

  const request = await axios.post('/api/v1/auth/login', loginInfo)
        .then((response) => {
          //console.log(response.data);
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
          alert("아이디와 비밀번호가 일치하지 않습니다.");
          //if (error.response.status == 401 && error.response.data != "Refresh Token Expired") {
            //alert("로그인해 주시기 바랍니다.");
          //}
        });

  //console.log("request", request);
  
  return {
    type: "LOGIN_USER",
    payload: request
  }
}


async function login() {

  let result = await loginProcess();
  //console.log("result", result);
  
  if (result != null && result.payload != null) {
    localStorage.setItem("grantType", result.payload.grantType);
    localStorage.setItem("accessToken", result.payload.accessToken);
    localStorage.setItem("refreshToken", result.payload.refreshToken);
    
    alert("로그인 되었습니다.");
  }
}

</script>

<template>
  <div>
    <form>
      <div>이메일 : <input type="text" name="loginEmail" v-model="loginEmail" /></div>
      <div>비밀번호 : <input type="password" name="loginPass" v-model="loginPass" autoComplete="off" /></div>
      <div><input type="button" value="로그인" @click="login()"/></div>
    </form>
  </div>
</template>

