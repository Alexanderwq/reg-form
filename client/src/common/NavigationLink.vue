<template>
  <button
    :class="{'navigation-link_active': active}"
    class="navigation-link"
  >
    <slot name="text"></slot>
  </button>
</template>

<script setup>
  import { defineProps } from 'vue'

  defineProps({
    active: {
      type: Boolean,
      required: true,
    },
  })
</script>

<style lang="scss" scoped>
  .navigation-link{
    color: #686868;
    font-size: 30px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.45px;
    border: none;

    &_active{
      color: #4786FF;
      text-decoration-line: underline;
    }
  }
</style>