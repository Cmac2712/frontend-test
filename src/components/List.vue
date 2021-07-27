<template>
  <ul :class="listName">
    <ListItem
      v-for="task in sortedTasks"
      :key="task.id" 
      :task="task"
      @toggleDoneStatus="checkboxHandler"
      @deleteTask="deleteTask"
      @updateTask="updateTask"
    />
  </ul>
</template>

<script>
import ListItem from '@/components/ListItem.vue';

export default {  
  components: {
    ListItem
  },
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
    checkboxHandler ({ id, isDone }) {
      this.$emit('toggleDoneStatus', {
        id,
        isDone
      });
    },
    deleteTask (id) {
      this.$emit('deleteTask', id);
    },
    updateTask (task) {
      this.$emit('updateTask', task);
    }
  }
};
</script>
