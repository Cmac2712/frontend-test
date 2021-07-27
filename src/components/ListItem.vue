<template>
  <li
    class="list-item"
  >
    <div
      v-if="!isEditMode"
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
        <span
          :class="`badge badge-${getImportanceLabel(task.importance).toLowerCase()} ml-2`"
        >
          {{ getImportanceLabel(task.importance) }}
        </span>
      </label>
      <button
        class="btn btn-primary mr-4"
        @click="toggleEditMode"
      >
        Edit
      </button>
      <button 
        class="delete" 
        @click="deleteTask(task.id)"
      >
        <span class="visually-hidden">Delete</span>
      </button>
    </div>
    <!-- Edit mode -->
    <div
      v-if="isEditMode"
    >
      <div class="input-group input-group-sm mb-3 mr-4">
        <span
          id="new-item-input"
          class="input-group-text"
        >
          Update Task
        </span>
        <input 
          v-model="newTitle"
          type="text"
          class="form-control"
          :for="`task-${task.id}`"
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
          v-model="newImportance"
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
            High
          </option>
          <option value="1">
            Medium
          </option>
          <option value="2">
            Low
          </option>
        </select>
      </div>
      <button
        class="btn btn-success"
        @click="updateTask(task)"
      >
        Update
      </button>
    </div>
  </li>
</template>

<script>
export default {  
  props: {
      task: {
          type: Object,
          required: true
      }
  },
  data() {
      return {
          isEditMode: false,
          newTitle: this.task.title,
          newImportance: this.task.importance
      }
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
    },
    toggleEditMode () {
      this.isEditMode = this.isEditMode === false ? true : false;
    },
    deleteTask (id) {
      this.$emit('deleteTask', id);
    },
    updateTask (task) {

      task.title = this.newTitle;

      this.$emit('updateTask', {
          ...task,
          title: this.newTitle,
          importance: this.newImportance
      });

      this.isEditMode = false;
    },
    getImportanceLabel(imp) {
        var label = '';

        switch (imp) {
            case 0:
                label = 'High';
                break;
            case 1:
                label = 'Medium';
                break;
            default: 
                label = 'Low';
        }

        return label;

    }
  }
};
</script>