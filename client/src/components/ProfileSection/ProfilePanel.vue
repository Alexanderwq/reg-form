<template>
  <div class="profile-panel">
    <FormButton @click="updateProfile">
      <template v-slot:text>
        Сохранить
      </template>
    </FormButton>
    <button
      @click="profileStore.resetProfile"
      class="profile-panel__reset"
    >
      Отмена
    </button>
  </div>
</template>

<script setup>
  import FormButton from "@/common/FormButton.vue";
  import {useProfileStore} from "@/stores/useProfileStore";
  import {useAlertStore} from "@/stores/alertStore";
  import {useUserStore} from "@/stores/userStore";

  const { showAlert } = useAlertStore()
  const userStore = useUserStore()
  const profileStore = useProfileStore()

  function validFields() {
    if (!profileStore.userNameIsDisabled && userStore.userNameIsEmpty) {
      showAlert('Ошибка! Поле с именем должно быть заполнено')
      return false;
    }
    if (!profileStore.emailIsDisabled && userStore.emailIsEmpty) {
      showAlert('Ошибка! Поле email должно быть заполнено')
      return false;
    }
    if (!profileStore.passwordIsDisabled && userStore.passwordIsEmpty) {
      showAlert('Ошибка! Поле пароль должно быть заполнено')
      return false;
    }
    if (!profileStore.confirmPasswordIsDisabled && userStore.confirmPasswordIsEmpty) {
      showAlert('Ошибка! Поле подтверждение пароля должно быть заполнено')
      return false;
    }

    if ((!profileStore.confirmPasswordIsDisabled || !profileStore.passwordIsDisabled) && !userStore.passwordsMatch) {
      showAlert('Ошибка! Пароли не совпадают')
      return false;
    }

    return true;
  }

  async function updateProfile() {
    try {
      if (!validFields()) return

      await profileStore.updateProfile()
      profileStore.disableFields()
      userStore.setPassword('')
      userStore.setConfirmPassword('')
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