<svelte:options tag="my-dashboard" />

<script lang="ts">
  import InputHeader from "./components/InputHeader.svelte";
  import Folder from "./components/Folder.svelte";
  import { itemList } from "../stores/ItemList";
  import Navbar from "./components/Navbar.svelte";

  type File = {
    name: String;
    type: String;
    id: String;
    createdAt: Date;
  };

  // export let name: String;
  // export let files: Array<File>;

  const title = "My Web Component";

  function iterate(parent, value) {
    for (let i = 0; i < parent.length; i++) {
      if (parent[i].id == value) {
        parent.splice(i, 1);
        if (parent.length) break;
        return parent.length;
      }
      if (parent[i].files) {
        let len = iterate(parent[i].files, value);
        if (len == 0 && parent[i]) {
          delete parent[i].files;
          break;
        }
      }
    }
  }

  //Deleting item
  function handleDeleteItem({ detail }) {
    itemList.update((list) => {
      let newList = list;
      iterate(newList, detail);
      return newList;
    });
  }
</script>

<Navbar {title} />
<InputHeader />
<div class="hierarchy-body">
  <Folder
    name="Root Level"
    files={$itemList}
    expanded
    on:delete_item={handleDeleteItem}
  />
</div>

<style>
  .hierarchy-body {
    background: rgba(241, 241, 255, 0.342);
    width: 57%;
    margin: 0 18% 0 18%;
    padding: 7px;
  }
</style>
