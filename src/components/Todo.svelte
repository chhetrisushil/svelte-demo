<script>
  import {createEventDispatcher, tick} from "svelte";
  import {selectOnFocus, focusOnInit} from "../actions.js";

  export let todo;
  const dispatch = createEventDispatcher();
  let editing = false; // track editing mode.
  let name = todo.name; // hold the name of the to-do being edited.
  let editButtonPressed = false; // track if edit button has been pressed, to give focus to it after cancel or save.


  function update(updatedTodo) {
    todo = {...todo, ...updatedTodo}; // applies modification to todo.
    dispatch("update", todo); // emit update event.
  }

  function onCancel() {
    name = todo.name; // restores name to its initial value.
    editing = false; // and exit editing mode.
  }

  function onSave() {
    update({name}); // update todo name.
    editing = false; // and exit editing mode.
  }

  function onRemove() {
    dispatch("remove", todo); // emit remove event.
  }

  async function onEdit() {
    editButtonPressed = true; // user pressed the Edit button, focus will come back to the Edit button.
    editing = true; // endter editing mode.
  }

  function onToggle() {
    update({completed: !todo.completed}); // update todo status.
  }

  const focusEditButton = node => editButtonPressed && node.focus();
</script>

<div class="stack-small">
  {#if editing}
    testing text
    <form on:submit|preventDefault={onSave} class="stack-small" on:keydown={e => e.key === 'Escape' && onCancel()}>
      <div class="form-group">
        <label for="todo-{todo.id}" class="todo-label">New name for '{todo.name}'</label>
        <input use:focusOnInit use:selectOnFocus bind:value={name} type="text" id="todo-{todo.id}" autoComplete="off" class="todo-text" />
      </div>
      <div class="btn-group">
        <button class="btn todo-cancel" on:click={onCancel} type="button">
          Cancel <span class="visually-hidden">renaming {todo.name}</span>
        </button>
        <button class="btn btn__primary todo-edit" type="submit" disabled={!name}>
          Save <span class="visually-hidden">new name for {todo.name}</span>
        </button>
      </div>
    </form>
  {:else}
    <div class="c-cb">
    <input
        type="checkbox"
        id="todo-{todo.id}"
        on:click={onToggle}
        checked={todo.completed} />
    <label for="todo-{todo.id}" class="todo-label">{todo.name}</label>
    </div>
    <div class="btn-group">
    <button type="button" class="btn" on:click={onEdit} use:focusEditButton>
        Edit <span class="visually-hidden">{todo.name}</span>
    </button>
    <button
        type="button"
        class="btn btn__danger"
        on:click={onRemove}
        >
        Delete <span class="visually-hidden">{todo.name}</span>
    </button>
    </div>
  {/if}
</div>
