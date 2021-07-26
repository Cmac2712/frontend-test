<template>
  <div class="container">
    <header>
      <h1>StormID ToDo List</h1>
    </header>
    <main>
      <Loader
        v-if="isLoading"
      />

      <List
        v-if="!isLoading"
        :tasks="tasksNotDone"
        :list-name="'todo'"
        @toggleDoneStatus="toggleDoneStatusHandler"
      />

      <AddNew
        v-if="!isLoading"
        :loading="isLoadingTask"
        @addNewItem="addNewItemHandler"
      />

      <List
        v-if="!isLoading"
        :list-name="'done'"
        :tasks="tasksDone"
        @toggleDoneStatus="toggleDoneStatusHandler"
      />
    </main>
  </div>
</template>

<script>
import List from "@/components/List.vue";
import AddNew from "@/components/AddNew.vue";
import Loader from "@/components/Loader.vue";
import { getToDoList, addTask, updateDoneStatus } from "@/services/EventService.js";

export default {
  components: {
    List,
    AddNew,
    Loader
  },
  data() {
    return {
      tasks: null,
      isLoading: true,
      isLoadingTask: false
    };
  },
  computed: {
    tasksDone() {
      return this.tasks ? this.tasks.filter(task => (task.isDone === "1" || task.isDone === "true")) : null
    },
    tasksNotDone() {
      return this.tasks ? this.tasks.filter(task => (task.isDone === "0") || task.isDone === "false") : null
    }
  },
  created() {
    this.fetchToDoList()
  },
  methods: {
    sort: arr => arr.sort((first, second) => first.importance - second.importance ),
    // Get list of all tasks
    fetchToDoList() {
      getToDoList()
        .then(res => {
          this.tasks = this.sort(res.data);
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // Add new task
    addNewItemHandler (data) {
      this.isLoadingTask = true;
      addTask(data)
        .then(res => {
          this.fetchToDoList();
          this.isLoadingTask = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // Update task done status
    toggleDoneStatusHandler ({id, isDone}) {
      this.isLoadingTask = true;

      updateDoneStatus({
        id,
        isDone
      })
      .then(res => {
        this.fetchToDoList();
        this.isLoadingTask = false;
      }) 
    } 
  }
};
</script>
