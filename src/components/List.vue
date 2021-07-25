<template>
  <ul :class="listName">
    <li
      v-for="task in tasks"
      :key="task.id"
      class="list-item"
    >
      {{ task.title }}
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
};
</script>
