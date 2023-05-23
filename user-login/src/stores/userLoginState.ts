import { writable } from "svelte/store";
const loginState = false;
export const userLoginState = writable(loginState);