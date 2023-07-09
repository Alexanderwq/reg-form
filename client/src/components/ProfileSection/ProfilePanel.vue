<template>
  <div class="profile-panel">
    <FormButton @click="updateProfile">
      <template v-slot:text>
        Сохранить
      </template>
    </FormButton>
    <button class="profile-panel__reset">
      Отмена
    </button>
  </div>
</template>

<script setup>
  import FormButton from "@/common/FormButton.vue";
  import {useProfileStore} from "@/stores/useProfileStore";
  import {useAlertStore} from "@/stores/alertStore";

  const { showAlert } = useAlertStore()
  const profileStore = useProfileStore()

  async function updateProfile() {
    try {
      await profileStore.updateProfile()
      showAlert('Пользователь обновлен')
    } catch (e) {
      if (e.response.data.message) {
        showAlert(e.response.data.message)
      } else {
        showAlert('Произошла ошибка на сервере!')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .profile-panel{
    display: flex;
    gap: 50px;
    justify-content: center;
    align-items: center;
    grid-column: 1/3;

    &__reset {
      border-radius: 8px;
      border: 2px solid #4786FF;
      cursor: pointer;
      background: transparent;
      color: #4786FF;
      font-size: 32px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      padding: 18px 40px;
    }
  }
</style>