<svelte:options tag="my-file" />

<script lang="ts">
  import itemType from "../constants/ItemType";
  import { createEventDispatcher } from "svelte";
  import DeleteIcon from "./customIcon/DeleteIcon.svelte";
  import FileIcon from "./customIcon/FileIcon.svelte";
  import FolderIcon from "./customIcon/FolderIcon.svelte";

  const dispatch = createEventDispatcher();
  export let name: String;
  export let type: String;
  export let createdAt: Date;
  export let id: String;

  function deleteFile(id: String) {
    dispatch("delete_item", id);
  }
</script>

<div class="file-info" style="display: flex;">
  <div class="file-icon" style=" display: flex; flex: 2%; padding: 12px;">
    {#if type === itemType.FOLDER}
      <FolderIcon />
    {:else if type === itemType.FILE}
      <FileIcon />
    {/if}
  </div>
  <div
    class="file-body"
    style="display: flex; flex: 98%; font-family: Segoe UI;  background: rgb(255, 255, 254);"
  >
    <span
      class="file-name"
      style=" font-size: 16px; width: 100%; border-radius: 3px; margin: 5px; padding: 5px;padding-left: 20px; flex: 6;"
      >{name}</span
    >
    <span
      class="file-date"
      style=" font-size: 12px; width: 100%; border-radius: 3px; margin: 8px; padding: 5px; padding-left: 20px; flex: 3;"
      >{createdAt}</span
    >
    <div
      class="file-delete"
      on:click={deleteFile.bind(this, id)}
      style=" flex: 1; margin: 8px;"
    >
      <DeleteIcon />
    </div>
  </div>
</div>

<style>
  .file-info {
    display: flex;
  }
  .file-icon {
    display: flex;
    flex: 2%;
    padding: 12px;
  }
  .file-body {
    display: flex;
    flex: 98%;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background: rgb(255, 255, 254);
  }
  .file-name {
    font-size: 16px;
    width: 100%;
    border-radius: 3px;
    margin: 5px;
    padding: 5px;
    padding-left: 20px;
    flex: 6;
  }
  .file-date {
    font-size: 12px;
    width: 100%;
    border-radius: 3px;
    margin: 8px;
    padding: 5px;
    padding-left: 20px;
    flex: 3;
  }
  .file-delete {
    flex: 1;
    margin: 8px;
  }
</style>
