<template>
  <div class="container">
    <List
      :tasks="tasksNotDone"
      :list-name="'todo'"
    />
    <List
      :list-name="'done'"
      :tasks="tasksDone"
    />
  </div>
</template>

<script>
import List from "@/components/List.vue";
import EventService from "@/services/EventService.js";

export default {
  components: {
    List
  },
  data() {
    return {
      tasks: null
    };
  },
  computed: {
    tasksDone() {
      return this.tasks ? this.tasks.filter(task => task.isDone == 1) : null
    },
    tasksNotDone() {
      return this.tasks ? this.tasks.filter(task => task.isDone == 0) : null
    }
  },
  created() {
    EventService.getTodoList()
      .then((res) => {
        this.tasks = this.sort(res.data);
      });
  },
  methods: {
    sort: arr => arr.sort((first, second) => first.importance - second.importance )
  }
};
</script>
