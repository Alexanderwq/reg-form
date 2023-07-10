<template>
  <div class="login-form">
    <p class="login-form__title">
      Войдите в систему
    </p>
    <FormInput
      :value="userStore.email"
      :valid="fieldsValidStatus.email"
      @setValue="userStore.setEmail"
      name="email"
      label="Email"
    />
    <FormInput
        :value="userStore.password"
        :valid="fieldsValidStatus.password"
        @setValue="userStore.setPassword"
        name="password"
        label="Пароль"
    />
    <FormButton
        @click="signIn"
        class="login-form__button"
    >
      <template v-slot:text>
        Войти
      </template>
    </FormButton>
  </div>
</template>

<script setup>
  import FormInput from "@/common/FormInput.vue";
  import {useUserStore} from "@/stores/userStore";
  import FormButton from "@/common/FormButton.vue";
  import {useAlertStore} from "@/stores/alertStore";
  import {ref} from "vue";
  import {useNavigationStore} from "@/stores/navigationStore";
  import {useProfileStore} from "@/stores/useProfileStore";

  const userStore = useUserStore()
  const { showAlert } = useAlertStore()
  const navStore = useNavigationStore()
  const profileStore = useProfileStore()

  const fieldsValidStatus = ref({
    email: true,
    password: true,
  })

  function formIsValid() {
    if (userStore.emailIsEmpty) {
      fieldsValidStatus.value.email = false;
      showAlert('Ошибка! Не заполенено поле "Email"');
      return false;
    }
    if (userStore.passwordIsEmpty) {
      fieldsValidStatus.value.password = false;
      showAlert('Ошибка! Не заполенено поле "Пароль"');
      return false;
    }
    if (!userStore.emailIsValid) {
      fieldsValidStatus.value.email = false;
      showAlert('Ошибка! Не корректно заполнено поле "Email"')
      return false;
    }

    for (let key in fieldsValidStatus.value) {
      fieldsValidStatus.value[key] = true;
    }

    return true
  }

  async function signIn() {
    if (!formIsValid()) return

    try {
      const res = await userStore.signIn()
      document.cookie = `token=${res.data.token}`
      navStore.setSection(navStore.profileSection)
      profileStore.getProfile()
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
  .login-form{
    display: flex;
    max-width: 600px;
    flex-direction: column;
    gap: 40px;
    margin: 0 auto;

    &__title{
      text-align: center;
      color: #4786FF;
      font-size: 50px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 20px;
    }

    &__button{
      margin-top: 50px;
      margin-bottom: 65px;
    }
  }
</style>