<template>
  <button class="form-button">
    <slot name="text"></slot>
  </button>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .form-button{
    border-radius: 10px;
    background: #4786FF;
    color: #fff;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    transition: .2s ease-in-out;
    cursor: pointer;
    border: 2px solid #4786FF;
    padding: 18px 80px;
    &:hover{
      border-radius: 10px;
      background: transparent;
      border: 2px solid #4786FF;
      color: #4786FF;
    }
  }
</style>