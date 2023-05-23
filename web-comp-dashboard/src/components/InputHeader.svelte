<svelte:options tag="my-input-header" />

<script lang="ts">
  import { itemList } from "../../stores/ItemList";
  import itemType from "../constants/ItemType";
  import { v4 as uuidv4 } from "uuid";
  import Button from "./Button.svelte";
  import getCurrentDateTime from "../services/getCurrentDateTime";

  let name: String, selectedType: String, selectedFolder: String;

  type File = {
    name: String;
    type: String;
    id: String;
    createdAt: Date;
  };
  interface List {
    name: String;
    id: String;
    type: String;
    createdAt: Date;
    files?: Array<File>;
  }

  //Getting available folder list from store
  $: level =
    $itemList && $itemList.length
      ? [
          "Root",
          ...$itemList
            .filter((list) => list.type == itemType.FOLDER)
            .map((list) => list.name),
        ]
      : ["Root"];

  //Saving file or folder
  function handleSave() {    
    if (!name) {
      alert("Please choose a name before saving!");
      return;
    }
    if (!selectedType) {
      alert("Please choose a type e.g. file or folder before saving!");
      return;
    }
    if (!selectedFolder) {
      alert("Please choose a level either root or folder before saving!");
      return;
    }
    itemList.update((list: Array<List>) => {
      if (selectedFolder === "Root") {
        //check if file or folder with same name already there
        const isFileNameExists = list.find(
          (l) => l.name == name && l.type == selectedType
        );
        if (isFileNameExists) {
          alert(
            `This ${selectedType} with name ${name} is already exists can't be added in same level!`
          );
          return list;
        }
        return [
          ...list,
          {
            name,
            type: selectedType,
            id: uuidv4(),
            createdAt: getCurrentDateTime(),
          },
        ];
      } else if (selectedFolder) {
        const fileInfo = {
          name,
          type: selectedType,
          id: uuidv4(),
          createdAt: getCurrentDateTime(),
        };
        var newList = list.map((l) => {
          if (l.name === selectedFolder && l.type === itemType.FOLDER) {
            //check if file or folder with same name already there
            const isFileNameExists =
              l.files &&
              l.files.find((f) => f.name == name && f.type == selectedType);
            if (isFileNameExists) {
              alert(
                `This ${selectedType} with name ${name} is already exists can't be added in same level!`
              );
              return list;
            }
            const files = l.files ? [...l.files, fileInfo] : [fileInfo];
            return { ...l, files };
          } else return l;
        });
        return [...newList];
      }
    });
    name = "";
  }

  //Deleting all folder and file
  function handleClearAll() {
    itemList.set([]);
    name = "";
    selectedFolder = "Root";
    level = ["Root"];
  }

  //Reseting entered value
  function handleCancel() {
    name = "";
    level = ["Root"];
  }
</script>

<div
  class="input-header"
  style="display: flex; width: 58%; height: 40px; margin: 5% 25% 1% 18%;"
>
  <input
    bind:value={name}
    class="input-text"
    style="flex: 4;margin-right: 10px; font-size: 15px; padding-left: 15px;outline: none; margin-right: 10px;margin-left: 0px;border-radius: 3px;border: 1px solid rgba(78, 78, 87, 0.596);"
    type="text"
    placeholder="Please add a file or folder name"
  />
  <div class="input-type" style="display: flex; flex: 1;">
    <select
      name="type"
      id="select-type"
      bind:value={selectedType}
      style="margin-right: 8px; border-radius: 3px; width: 100%;font-family: Segoe UI;"
    >
      <option value={itemType.FOLDER}>{itemType.FOLDER}</option>
      <option value={itemType.FILE}>{itemType.FILE}</option>
    </select>
  </div>
  {#if level && level.length}
    <div class="folder-list" style="display: flex; flex: 1.5;">
      <select
        name="type"
        id="folder-list-type"
        bind:value={selectedFolder}
        style="margin-right: 8px; border-radius: 3px; width: 100%; font-family: Segoe UI;"
      >
        {#each level as name}
          <option value={name}>{name}</option>
        {/each}
      </select>
    </div>
  {/if}
  <Button
    button_name="Save"
    style_class="background: rgb(96, 73, 199);"
    handle_click={handleSave}
  />
  <Button
    button_name="Cancel"
    style_class="background: rgb(192, 99, 99);"
    handle_click={handleCancel}
  />
  <Button
    button_name="Clear All"
    style_class="background: rgb(226, 44, 44);"
    handle_click={handleClearAll}
  />
</div>

<style>
  .input-header {
    display: flex;
    width: 58%;
    height: 40px;
    margin: 5% 25% 1% 18%;
  }
  .input-text {
    flex: 4;
    margin-right: 10px;
    outline: none;
    margin-right: 10px;
    margin-left: 0px;
    border-radius: 3px;
    border: 1px solid rgba(78, 78, 87, 0.596);
  }
  input[type="text"] {
    font-size: 20px;
    padding-left: 15px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  ::placeholder {
    padding-left: 2px;
    margin: 5px;
    font-size: medium;
    font-weight: 400;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .input-type {
    display: flex;
    flex: 1;
  }
  #select-type {
    margin-right: 8px;
    border-radius: 3px;
    width: 100%;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .folder-list {
    display: flex;
    flex: 1.5;
  }
  #folder-list-type {
    margin-right: 8px;
    border-radius: 3px;
    width: 100%;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
