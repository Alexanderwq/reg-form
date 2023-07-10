<template>
  <div class="container">
    <Alert />
    <UserWidget v-if="!loading" />
  </div>
</template>

<script setup>
  import Alert from "@/components/Alert.vue";
  import UserWidget from "@/components/UserWidget.vue";
  import {useUserStore} from "@/stores/userStore";
  import NavigationSections from "@/const/NavigationSections";
  import {useNavigationStore} from "@/stores/navigationStore";
  import {onMounted, ref} from "vue";
  import {useProfileStore} from "@/stores/useProfileStore";

  const navStore = useNavigationStore()
  const userStore = useUserStore()
  const profileStore = useProfileStore()

  const loading = ref(true);

  onMounted( async () => {
    await userStore.setAuthStatus()
    if (userStore.authStatus) {
      navStore.setSection(NavigationSections.PROFILE)
      profileStore.getProfile()
    }
    loading.value = false
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
