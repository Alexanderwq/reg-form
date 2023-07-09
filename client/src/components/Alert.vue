<template>
  <teleport to="body" v-if="alertStore.visibleAlert">
    <div class="alert">
      <img class="alert__icon" src="../assets/img/error-icon.png" alt="icon" />
      <p class="alert__text">
        {{ alertStore.text }}
      </p>
      <img
        @click="alertStore.setVisibleAlert(false)"
        class="alert__close"
        src="../assets/img/close.png"
        alt="close"
      />
    </div>
  </teleport>
</template>

<script setup>
import {useAlertStore} from "@/stores/alertStore";

const alertStore = useAlertStore();
</script>

<style lang="scss" scoped>
  .alert{
    padding: 35px 30px 25px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border: 2px solid #686868;
    position: fixed;
    display: flex;
    align-items: center;
    gap: 30px;
    background: white;
    max-width: 585px;
    width: 100%;
    z-index: 100;
    bottom: 60px;
    right: 0;

    &__text{
      color: #686868;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    &__close{
      cursor: pointer;
      position: absolute;
      top: 35px;
      right: 30px;
    }
  }
</style>