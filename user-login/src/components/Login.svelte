<script lang="ts">
  import Navbar from "./Navbar.svelte";
  import { userLoginState } from "../stores/userLoginState";
  import { setCookie } from "../services/configCookies";
  import { AES, enc } from 'crypto-js';
  let username: String = "";
  let password: String = "";

  //Handling User Login
  function handleLogin() {
    //Check if username is valid or not
    if (!username) {
      alert("Please provide a valid username");
      return;
    }
    //Check if password is valid or not
    if (!password) {
      alert("Please provide a valid password");
      return;
    }
    //check if user is registered already
    const { VITE_USERNAME, VITE_PASSWORD } = import.meta.env;
    if (username === VITE_USERNAME && password === VITE_PASSWORD) {
      userLoginState.update((state) => true);
      const sessionId = AES.encrypt(
        JSON.stringify(password),
        "secretPass"
      ).toString();
      setCookie("loginState", sessionId, 5);
    } else
      alert("Incorrect login credentials! Please login with valid credential");
  }
</script>

<Navbar title="User Login" />
<div class="login-container">
  <h3>User Login</h3>

  <div class="login-field">
    <div class="username-label">
      <label for="username">Username </label>
    </div>
    <div class="username-field">
      <input
        type="text"
        id="username"
        bind:value={username}
        placeholder="Enter username"
      />
    </div>
  </div>

  <div class="login-field">
    <div class="password-label">
      <label for="password">Password </label>
    </div>
    <div class="password-field">
      <input
        type="password"
        id="password"
        bind:value={password}
        placeholder="Enter password"
      />
    </div>
  </div>
  <div class="button-container">
    <button class="button" on:click={handleLogin}>Login</button>
  </div>
</div>

<style>
  .login-container {
    background: rgba(241, 241, 255, 0.342);
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    width: 30%;
    margin: 10% 32%;
    padding: 15px;
    height: 210px;
    border-radius: 3px;
    border: 1px solid rgba(215, 215, 241, 0.342);
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  }
  .login-container h3 {
    text-align: center;
    margin-top: 5px;
  }
  .login-field {
    display: flex;
    margin-bottom: 30px;
  }
  .login-field label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    margin-right: 20px;
  }
  .login-field input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .username-label {
    margin-left: 10px;
    display: flex;
    flex: 3;
  }
  .username-field {
    display: flex;
    margin-right: 50px;
    flex: 7;
  }
  .password-label {
    display: flex;
    margin-left: 10px;
    flex: 3;
  }
  .password-field {
    display: flex;
    margin-right: 50px;
    flex: 7;
  }
  .button-container {
    text-align: end;
  }
  .button {
    width: 80px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #4037ed;
    color: #fff;
    cursor: pointer;
    margin-right: 10px;
  }
  .button:hover {
    background-color: #6754f8;
  }
  input[type="text"],
  input[type="password"] {
    padding-left: 15px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  ::placeholder {
    padding-left: 2px;
    font-size: medium;
    font-weight: 400;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
