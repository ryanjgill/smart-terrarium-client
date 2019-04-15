<template>
  <div>
    <div class="title">
      {{ title }}
    </div>

    <blockquote class="blockquote">
      <slot>{{ value }}</slot>
    </blockquote>
  </div>
</template>
<script>
export default {
  props: {
    bold: Boolean,
    title: String,
    value: String
  }
};
</script>
