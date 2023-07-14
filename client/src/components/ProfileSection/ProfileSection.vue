<template>
  <div class="profile">
    <ProfilePhoto />
    <ProfileForm />
    <Transition name="slide">
      <ProfilePanel v-if="profileStore.showOptionsPanel" />
    </Transition>
  </div>
</template>

<script setup>
  import ProfilePhoto from "@/components/ProfileSection/ProfilePhoto.vue";
  import ProfileForm from "@/components/ProfileSection/ProfileForm.vue";
  import ProfilePanel from "@/components/ProfileSection/ProfilePanel.vue";
  import {useProfileStore} from "@/stores/profileStore";

  const profileStore = useProfileStore()
</script>

<style lang="scss" scoped>
  .profile{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 50px;
  }

  .slide-enter-active{
    transition: height .5s ease, opacity 1s cubic-bezier(0.11, 0, 0.5, 0) 0s;
  }
  .slide-leave-active {
    transition: height .5s ease, opacity .2s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
    height: 0;
  }
</style>