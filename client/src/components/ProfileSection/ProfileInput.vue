<template>
  <div class="wrapper">
    <input
      :disabled="disabled"
      :value="value"
      @input="$emit('inputValue', $event.target.value)"
      class="input"
      type="text"
    />
    <img
      @click="$emit('clickPencil')"
      class="pencil"
      src="../../assets/img/pencil.png"
      alt="pencil"
    />
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'

  defineProps({
    value: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
  })
</script>

<style lang="scss" scoped>
  .wrapper{
    position: relative;
  }

  .input{
    border-radius: 10px;
    background: #C8DBFF;
    border: 2px solid transparent;
    color: #4786FF;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 15px 50px;

    &_active{
      border-color: #4786FF;
    }
  }

  .pencil{
    position: absolute;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
  }

  .text{
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
</style>