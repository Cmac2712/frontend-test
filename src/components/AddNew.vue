<template>
  <div class="new-item-add">
    <div class="input-group input-group-sm mb-3 mr-4">
      <span
        id="new-item-input"
        class="input-group-text"
      >
        New Item
      </span>
      <input
        id="new-item-input"
        v-model="title"
        type="text"
        class="form-control" 
        aria-label="New Item" 
        aria-describedby="new-item-input"
        placeholder="Enter task description"
      >
    </div>

    <div class="input-group mb-3 mr-4">
      <label 
        class="input-group-text"
        for="importance-select"
      >
        Importance
      </label>
      <select
        id="importance-select"
        v-model="importance"
        class="form-select"
      >
        <option
          value="null"
          disabled
          selected
          hidden
        >
          Please Choose importance...
        </option>
        <option value="0">
          0
        </option>
        <option value="1">
          1
        </option>
        <option value="2">
          2
        </option>
      </select>
    </div>
    <button
      v-if="title !== '' && importance !== null"
      class="btn btn-success"
      @click="addNewItem"
    >
      Add
    </button>
  </div>
</template>

<script>
export default {
  data() {
      return {
          title: '',
          importance: null
      }
  },
  methods: {
      addNewItem () {
        // Validate inputs
        if (this.title === '') {
            alert('Please enter a title');
            return;
        }

        if (this.importance === null) {
            alert('Please select an importance for your task.');
            return;
        }

        // Emit event
        this.$emit('addNewItem', {
            title: this.title,
            importance: this.importance
        })

        // Reset inputs
        this.title = '';
        this.importance = null;
      } 
  }
};
</script>
