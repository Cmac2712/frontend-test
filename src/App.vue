<template>
  <List :tasks="tasks" />
</template>

<script>
import List from "@/components/List.vue";
import EventService from "@/services/EventService.js";

export default {
  components: {
    List,
  },
  data() {
    return {
      tasks: null,
    };
  },
  created() {
    EventService.getTodoList().then((res) => {
      this.tasks = res.data;
    });
  },
};
</script>
