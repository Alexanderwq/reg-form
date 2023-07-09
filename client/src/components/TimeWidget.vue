<template>
  <div class="time-widget">
    <p
      v-if="!showResendButton"
      class="time-widget__text">
      Повторно через
      <span class="time-widget__text_time">
        {{ time }}s
      </span>
    </p>
    <button
      v-else
      @click="resendEmail"
      class="time-widget__resend"
    >
      Отправить повторно
    </button>
  </div>
</template>

<script setup>
  import {computed, onMounted, ref} from "vue";
  import {useUserStore} from "@/stores/userStore";

  const userStore = useUserStore()
  const delaySeconds = 90
  const time = ref(0)

  const showResendButton = computed(() => {
    return time.value === 0
  })

  function startTimer() {
    if (time.value === 0) return

    setTimeout(() => {
      time.value--
      startTimer()
    }, 1000);
  }

  function resendEmail() {
    time.value = delaySeconds
    startTimer()
    userStore.sendConfirmationCode()
  }

  onMounted(() => {
    time.value = delaySeconds
    startTimer()
  })
</script>

<style lang="scss" scoped>
  .time-widget{
    &__text{
      color: #686868;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      &_time{
        color: #4786FF;
      }
    }

    &__resend{
      color: #4786FF;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-decoration-line: underline;
    }
  }
</style>