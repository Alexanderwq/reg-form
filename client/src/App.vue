<template>
  <div class="container">
    <Alert />
    <UserWidget />
  </div>
</template>

<script setup>
  import Alert from "@/components/Alert.vue";
  import UserWidget from "@/components/UserWidget.vue";
</script>

<style src="./assets/css/reset.css"></style>

<style lang="scss" scoped>
.container{
  background: url("./assets/img/background.png") center center no-repeat;
  background-size: cover;
  filter: drop-shadow(0px 10px 25px rgba(92, 99, 105, 0.20));
  position: absolute;
  width: 100%;
}
</style>
