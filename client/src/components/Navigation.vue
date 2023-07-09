<template>
  <div class="navigation">
    <NavigationLink
      :active="false"
    >
      <template v-slot:text>
        Вход
      </template>
    </NavigationLink>

    <NavigationLink
        :active="true"
    >
      <template v-slot:text>
        Зарегистрироваться
      </template>
    </NavigationLink>
  </div>
</template>

<script setup>
  import NavigationLink from "@/common/NavigationLink.vue";
</script>

<style lang="scss" scoped>
  .navigation{
    display: flex;
    align-items: center;
    gap: 50px;
  }
</style>