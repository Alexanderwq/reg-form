<template>
  <div class="container">
    <Alert />
    <UserWidget v-if="!loading" />
  </div>
</template>

<script setup>
  import Alert from "@/components/Alert.vue";
  import UserWidget from "@/components/UserWidget.vue";
  import {useNavigationStore} from "@/stores/navigationStore";
  import {onMounted, ref, shallowRef} from "vue";
  import {useAuthStore} from "@/stores/authStore";
  import {useProfileStore} from "@/stores/profileStore";

  const navStore = useNavigationStore()
  const authStore = useAuthStore()
  const profileStore = useProfileStore()
  const loading = ref(true);

  onMounted( async () => {
    try {
      const { authorization } = await authStore.getAuthStatus()
      if (authorization) {
        navStore.setSection(navStore.profileSection)
        await profileStore.getProfile()
      } else {
        navStore.setSection(shallowRef(navStore.regForm))
      }
    } catch (e) {
      if (e.response?.status === 401) {
        console.log(e)
      }
    } finally {
      loading.value = false
    }
  })
</script>

<style src="./assets/css/reset.css"></style>

<style lang="scss" scoped>
.container{
  background: url("./assets/img/background.png") center center no-repeat;
  background-size: cover;
  filter: drop-shadow(0px 10px 25px rgba(92, 99, 105, 0.20));
  position: absolute;
  width: 100%;
  min-height: 100%;
}
</style>
