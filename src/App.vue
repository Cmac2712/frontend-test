<template>
  <div class="container">
    <header>
      <h1>StormID ToDo List</h1>
    </header>
    <main>
      <List
        :tasks="tasksNotDone"
        :list-name="'todo'"
      />

      <AddNew
        @addNewItem="addNewItemHandler"
      />

      <List
        :list-name="'done'"
        :tasks="tasksDone"
      />
    </main>
  </div>
</template>

<script>
import List from "@/components/List.vue";
import AddNew from "@/components/AddNew.vue";
import { getToDoList, addTask } from "@/services/EventService.js";

export default {
  components: {
    List,
    AddNew
  },
  data() {
    return {
      tasks: null
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
    fetchToDoList() {
      getToDoList()
        .then(res => {
          this.tasks = this.sort(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addNewItemHandler (data) {
      addTask(data)
        .then(res => {
          this.fetchToDoList();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
