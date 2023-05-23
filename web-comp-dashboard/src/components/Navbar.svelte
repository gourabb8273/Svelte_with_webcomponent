<svelte:options tag="my-navbar" />

<script lang="ts">
  export let title: String;
</script>

<div
  class="nav_bar"
  style="background: rgb(22, 21, 21); padding: 0;margin: 0; height: 45px;"
>
  <h3
    style="background: rgb(22, 21, 21); padding: 0; margin: 0; color: white; font-family: Segoe UI;font-weight: 400;text-align: center;  padding: 5px 0;"
  >
    {title}
  </h3>
</div>

<style>
  .nav_bar {
    background: rgb(22, 21, 21);
    padding: 0;
    margin: 0;
    height: 45px;
  }
  .nav_bar h3 {
    background: rgb(22, 21, 21);
    padding: 0;
    margin: 0;
    color: white;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 400;
    text-align: center;
    padding: 5px 0;
  }
</style>
