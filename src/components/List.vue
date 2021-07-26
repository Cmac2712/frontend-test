<template>
  <ul :class="listName">
    <li
      v-for="task in tasks"
      :key="task.id"
      class="list-item"
    >
      <input
        :id="`task-${task.id}`"
        class="form-check-input mr-2"
        type="checkbox"
        :checked="checkIsDone(task.isDone)"
        @change="checkboxHandler(task.id, task.isDone)"
      >
      <label
        class="form-check-label"
        :for="`task-${task.id}`"
      >
        {{ task.title }}
      </label>
    </li>
  </ul>
</template>

<script>
export default {  
  props: {
    listName: {
      required: true,
      type: String,
    },
    tasks: {
      required: true,
      type: Array,
    },
  },
  methods: {
    checkIsDone (value) {
      if (value === "0" || value === "false") {
        return false;
      }

      return 'checked'
    },
    checkboxHandler (id, isDone) {
      this.$emit('toggleDoneStatus', {
        id,
        isDone: (isDone === "0" || isDone === "false") ? true : false 
      });
    }
  }
};
</script>
