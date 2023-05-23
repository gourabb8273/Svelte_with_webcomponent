<script lang="ts">
  import Login from "./components/Login.svelte";
  import "../dist/web-comp-dashboard";
  import { userLoginState } from "./stores/userLoginState";
  import { getCookie } from "./services/configCookies";
  const loginState = getCookie("loginState");
</script>

{#if $userLoginState || loginState}
  <my-dashboard />
{:else}
  <Login />
{/if}
