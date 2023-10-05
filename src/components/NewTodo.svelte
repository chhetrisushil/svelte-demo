<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { selectOnFocus } from "../actions.js";
  const dispatch = createEventDispatcher();

  export let autofocus = false;

  let name = '';
  let nameEl; // reference to the name input DOM node.

  const addTodo = () => {
    dispatch('addTodo', name);
    name = '';
    nameEl.focus(); // give focus to the name input.
  };

  const onCancel = () => (name = '', nameEl.focus());

  onMount(() => autofocus && nameEl.focus()); // if autofocus is true, we run nameEl.focus();
</script>

<form on:submit|preventDefault={addTodo} on:keydown={e => e.key === 'Escape' && onCancel()}>
  <h2 class="label-wrapper">
    <label for="todo-0" class="label__lg"> What needs to be done? </label>
  </h2>
  <input type="text" id="todo-0" autocomplete="off" class="input input__lg" bind:value={name} bind:this={nameEl} use:selectOnFocus />
  <button type="submit" disabled={!name} class="btn btn__primary btn__lg">
    Add
  </button>
</form>
