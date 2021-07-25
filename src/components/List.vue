<template>
  <ul>
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
    tasks: {
      required: true,
      type: Array,
    },
  },
};
</script>
