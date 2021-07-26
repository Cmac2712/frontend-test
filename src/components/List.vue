<template>
  <ul :class="listName">
    <li
      v-for="task in sortedTasks"
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
      <button
        class="delete"
        @click="deleteTask(task.id)"
      >
        <span class="visually-hidden">Delete</span>
      </button>
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
    sortBy: {
      type: String,
      default: 'importance'
    }
  },
  computed: {
    sortedTasks() {
      var ordered;

      switch (this.sortBy) {
        case 'importance':
          ordered = this.sortByImportance(this.tasks);
          break;
        case 'updatedAt':
          ordered = this.sortByUpdated(this.tasks);
          break;
      }

      return ordered;

    }
  },
  methods: {
    sortByImportance: function (arr) {
      return arr.sort((first, second) => first.importance - second.importance );
    },
    sortByUpdated: function (arr) {
      return arr.sort((first, second) => new Date(second.updatedAt) - new Date(first.updatedAt));
    },
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
    },
    deleteTask (id) {
      this.$emit('deleteTask', id);
    }
  }
};
</script>
