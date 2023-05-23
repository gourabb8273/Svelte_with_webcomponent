<svelte:options tag="my-folder" />

<script lang="ts">
  import File from "./File.svelte";
  import { createEventDispatcher } from "svelte";
  import EmptyList from "./EmptyList.svelte";
  import DeleteIcon from "./customIcon/DeleteIcon.svelte";

  const dispatch = createEventDispatcher();

  type File = {
    name: String;
    type: String;
    id: String;
    createdAt: Date;
    files: Array<File>;
  };

  export let expanded: Boolean = false;
  export let name: String;
  export let files: Array<File>;
  export let id: String;

  function handleDeleteFolder(id: String) {
    dispatch("delete_item", id);
  }

  function handleToggle() {
    expanded = !expanded;
  }
</script>

<div class="hierarchy-list">
  <div class="folder-info" style="display: flex;">
    <div class="folder-header" style="display: flex; width: 100%;">
      <div class="folder-icon" />
      <div class="folder-name" style="flex: 20; margin: 5px;">
        <button
          on:click={handleToggle}
          style="border: none;background: rgba(241, 241, 255, 0.342);font-family: sans-serif;font-size: medium;font-weight: 600;"
          >{name}</button
        >
      </div>
      {#if name !== "Root Level"}
        <div class="folder-delete" on:click={handleDeleteFolder.bind(this, id)}>
          <DeleteIcon />
        </div>
      {/if}
    </div>
  </div>

  {#if expanded}
    <ul
      style=" padding: 0.2em 0 0 0.5em;margin: 0 0 0 0.5em;list-style: none;border-left: 1px solid #eee;"
    >
      {#each files as file}
        <li style="margin: 5px; padding: 5px;padding: 0.2em 0;">
          {#if file.files}
            <svelte:self {...file} on:delete_item />
          {:else}
            <File {...file} on:delete_item />
          {/if}
        </li>
      {:else}
        <EmptyList />
      {/each}
    </ul>
  {/if}
</div>

<style>
  .folder-info {
    display: flex;
  }
  .hierarchy-list li {
    margin: 5px;
    padding: 5px;
  }
  ul {
    padding: 0.2em 0 0 0.5em;
    margin: 0 0 0 0.5em;
    list-style: none;
    border-left: 1px solid #eee;
  }
  li {
    padding: 0.2em 0;
  }
  .folder-header {
    display: flex;
    width: 100%;
  }
  .folder-name {
    flex: 20;
    margin: 5px;
  }
  .folder-icon {
    flex: 1;
    margin: 5px;
  }
  .folder-delete {
    flex: 0.5;
    margin: 8px;
  }
</style>
