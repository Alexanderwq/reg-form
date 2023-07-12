import {computed, ref} from "vue";

export default function useUserName() {
    const userName = ref('')

    const userNameIsEmpty = computed(() => userName.value.length === 0)

    function setUserName(value) {
        userName.value = value
    }

    return {
        userName,
        userNameIsEmpty,
        setUserName,
    }
}