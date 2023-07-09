<template>
  <label :for="id" class="label" :class="{'label_invalid': !props.valid}">
    <input
        :value="value"
        :name="name"
        :id="id"
        @input="$emit('setValue', $event.target.value)"
        @change="setValidClass"
        class="input"
        type="text"
        placeholder="&nbsp;"
    />
    <span class="label-text">{{ label }}</span>
  </label>
</template>

<script setup>
  import defineProps, {onMounted, ref} from 'vue';
  import uniqueid from 'lodash.uniqueid';

  const props = defineProps({
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    valid: {
      type: Boolean,
      required: true,
    },
  });

  const id = ref('123')

  function setId(value) {
    id.value = value
  }

  onMounted(() => {
    setId(uniqueid())
  })
</script>

<style lang="scss" scoped>
  .label{
    position: relative;
    &_invalid{
      & .label-text{
        color: #CB5E5E;
      }
      & .input{
        border-color: #CB5E5E;
      }
    }
  }
  .label-text {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #686868;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    left: 20px;
    cursor: initial;
    transition: all .2s ease;
  }
  .input{
    border-radius: 10px;
    border: 2px solid #686868;
    color: #686868;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 25px 30px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    &:not(:placeholder-shown) + .label-text {
      transform: translateY(-70px)
    }
    &:focus + .label-text {
        transform: translateY(-70px)
      }
  }
</style>