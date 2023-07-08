<template>
  <div class="container">
    <div class="wrapper">
      <RegForm />
    </div>
  </div>
</template>

<script setup>
  import RegForm from "@/components/RegForm.vue";
</script>

<style lang="scss" scoped>
.container{
  background: url("./assets/background.png") center center no-repeat;
  background-size: cover;
  filter: drop-shadow(0px 10px 25px rgba(92, 99, 105, 0.20));
  position: fixed;
  width: 100%;
  height: 100%;
}

.wrapper{
  max-width: 1040px;
  padding: 30px;
  background: #FFF;
  filter: drop-shadow(0px 10px 25px rgba(92, 99, 105, 0.20));
  border-radius: 10px;
  margin: 100px auto 0;
}
</style>
