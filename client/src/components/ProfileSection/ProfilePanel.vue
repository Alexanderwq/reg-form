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
  import {useProfileStore} from "@/stores/profileStore";
  import {useAlertStore} from "@/stores/alertStore";
  import {computed} from "vue";

  const { showAlert } = useAlertStore()
  const profileStore = useProfileStore()

  const formIsValid = computed(() => {
    return (profileStore.userNameIsDisabled || !profileStore.userNameIsEmpty) &&
        (profileStore.emailIsDisabled || !profileStore.emailIsEmpty) &&
        (profileStore.passwordIsDisabled || !profileStore.passwordIsEmpty) &&
        (profileStore.confirmPasswordIsDisabled || !profileStore.confirmPasswordIsEmpty) &&
        profileStore.passwordsMatch
  })

  const getErrorMessage = computed(() => {
    let message = []
    if (!profileStore.userNameIsDisabled && profileStore.userNameIsEmpty) {
      message.push('Не заполенено поле "Имя"');
    }
    if (!profileStore.emailIsDisabled && profileStore.emailIsEmpty) {
      message.push('Не заполенено поле "Email"');
    }
    if (!profileStore.passwordIsDisabled && profileStore.passwordIsEmpty) {
      message.push('Не заполенено поле "Пароль"');
    }
    if (!profileStore.confirmPasswordIsDisabled && profileStore.confirmPasswordIsEmpty) {
      message.push('Не заполенено поле "Подтверждение пароля"');
    }
    if (!profileStore.emailIsDisabled && !profileStore.emailIsValid) {
      message.push('Не корректно заполнено поле Email')
    }
    if ((!profileStore.passwordIsDisabled || !profileStore.confirmPasswordIsDisabled) && !profileStore.passwordsMatch) {
      message.push('Пароли не совпадают')
    }

    return 'Ошибка!\n' + message.join('\n');
  })

  async function updateProfile() {
    try {
      if (!formIsValid.value) return showAlert(getErrorMessage.value)

      await profileStore.updateProfile()
      profileStore.disableFields()
      profileStore.setPassword('')
      profileStore.setConfirmPassword('')
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
    grid-column: 1/3;
    align-items: end;
    height: 140px;

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