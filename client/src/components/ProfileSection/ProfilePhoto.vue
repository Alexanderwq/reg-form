<template>
  <label class="photo-block">
    <img class="photo-block__img" :src="imgSrc" alt="photo" />
    <p class="photo-block__name">
      {{ userStore.userName }}
    </p>
    <input @change="uploadPhoto" type="file" hidden />
  </label>
</template>

<script setup>
  import api from "@/api/profile/api";
  import {computed} from "vue";
  import {useProfileStore} from "@/stores/useProfileStore";
  import {useAlertStore} from "@/stores/alertStore";
  import {useUserStore} from "@/stores/userStore";
  const URL_IMG = '/photos'
  const DEFAULT_SRC = '/img/default-photo.png'

  const profileStore = useProfileStore()
  const userStore = useUserStore()
  const alertStore = useAlertStore()

  const imgSrc = computed(() => {
    return profileStore.imgName.length === 0 ? DEFAULT_SRC : URL_IMG + '/' + profileStore.imgName
  })

  async function uploadPhoto(e) {
    try {
      const file = e.target.files[0]
      const ext = file.name
          .split('.')
          .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
          .slice(1)
          .join('.')

      if (ext !== 'png' && ext !== 'jpg') return alertStore.showAlert('Формат изображения должен быть PNG или JPG')
      const res = await api.uploadProfilePhoto(file)
      profileStore.setImg(res.data.img)
    } catch (e) {
      console.log(e)
    }
  }
</script>

<style lang="scss" scoped>
  .photo-block{
    border-radius: 30px;
    background: #C8DBFF;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    justify-content: center;

    &__img{
      max-width: 170px;
      height: 170px;
      width: 100%;
      overflow: hidden;
      border-radius: 50%;
      cursor: pointer;
      transition: .2s ease-in-out;

      &:hover{

      }
    }

    &__name{
      color: #4786FF;
      font-size: 40px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
</style>