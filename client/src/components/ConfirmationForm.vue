<template>
  <form class="confirm-form" @submit.prevent="submitCode">
    <p class="confirm-form__title">
      Подтверждение через почту
    </p>
    <p class="confirm-form__subtitle">
      Введите код, направленный на почту test@mail.ru
    </p>
    <p class="confirm-form__description">
      Письмо возможно попадает в спам
    </p>
    <FormInput
      :value="authStore.code"
      :valid="!submittedForm || !authStore.codeIsEmpty"
      @setValue="authStore.setCode"
      name="code"
      label="Код подтверждения с Email"
      class="confirm-form__input"
    />
    <FormButton
      class="confirm-form__button"
    >
      <template v-slot:text>
        Отправить
      </template>
    </FormButton>

    <TimeWidget
      class="confirm-form__resend"
    />
  </form>
</template>

<script setup>
  import FormInput from "@/common/FormInput.vue";
  import FormButton from "@/common/FormButton.vue";
  import TimeWidget from "@/components/TimeWidget.vue";
  import {useAlertStore} from "@/stores/alertStore";
  import {ref} from "vue";
  import {useNavigationStore} from "@/stores/navigationStore";
  import useCookie from "@/composables/useCookie";
  import {useAuthStore} from "@/stores/authStore";

  const alertStore = useAlertStore()
  const navStore = useNavigationStore()
  const { setCookie } = useCookie()
  const authStore = useAuthStore()

  const submittedForm = ref(false);

  async function submitCode() {
    submittedForm.value = true;

    if (authStore.codeIsEmpty) {
      alertStore.showAlert('Ошибка! Поле с кодом не должно быть пустым!')
      return
    }

    try{
      const res = await authStore.signUp()
      setCookie('token', res.token)
      navStore.setSection(navStore.profileSection)
    } catch (e) {
      if (e.response.data.message) {
        alertStore.showAlert(e.response.data.message)
      } else {
        alertStore.showAlert('Произошла ошибка на сервере!')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .confirm-form{
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0 auto;
    text-align: center;

    &__title{
      color: #4786FF;
      font-size: 50px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-bottom: 20px;
      margin-top: 70px;
    }

    &__subtitle{
      color: #000;
      font-size: 35px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    &__description{
      color: #959595;
      font-size: 28px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    &__button{
      margin-top: 60px;
      margin-bottom: 10px;
    }

    &__input{
      margin-top: 80px;
    }

    &__button,
    &__input{
      max-width: 600px;
      width: 100%;
      align-self: center;
    }

    &__resend{
      margin-bottom: 155px;
    }
  }
</style>