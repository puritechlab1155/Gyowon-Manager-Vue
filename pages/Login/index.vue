<template>
  <div
    class="login-wrap min-h-screen flex items-start justify-center bg-[#F4F6FA] pt-[60px]"
  >
    <div class="bg-white shadow-xl rounded-2xl p-15 w-full max-w-xl">
      <h2 class="text-[40px] font-bold text-[#2B5BBB] text-center mb-6">
        로그인
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-[18px] font-medium text-gray-700 mb-1"
            >아이디</label
          >
          <input
            v-model="formValues.email"
            type="text"
            placeholder="ExampleId"
            class="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2B5BBB]"
            required
          />
        </div>

        <div>
          <label class="block text-[18px] font-medium text-gray-700 mb-1"
            >비밀번호</label
          >
          <input
            v-model="formValues.password"
            type="password"
            placeholder="••••••••"
            class="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2B5BBB]"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-[#2B5BBB] text-white text-[18px] py-3.5 mt-4 rounded-md font-semibold hover:bg-[#244ca0] transition"
        >
          로그인
        </button>
      </form>

      <p class="text-sm text-center text-gray-500 mt-6">계정이 없으신가요?</p>
      <p class="mt-3 text-[#2B5BBB] text-center font-medium hover:underline">
        관리자에게 문의바랍니다
      </p>
    </div>
  </div>
</template>

<script setup>
import { useState } from '#app';

const pageTitle = useState('pageTitle');
pageTitle.value = '관리자';

const router = useRouter();
const { login, isLoggedIn } = await useAuth();
onMounted(() => {
  if (isLoggedIn.value) {
    router.push('/admin/members/list');
  }
});
const formValues = reactive({
  email: '',
  password: '',
});
const handleLogin = async () => {
  if (!formValues.email) {
    //TODO return alert input email
    return;
  }
  if (!formValues.password) {
    //TODO return alert input password
    return;
  }
  await login({ ...formValues });
};
</script>

<style scoped>
@media (max-width: 400px) {
  .login-wrap {
    padding-left: 10px;
    padding-right: 10px;
  }
}
@media (max-width: 639.9px) {
  .login-wrap {
    padding-top: 30px;
  }
}
@media (max-width: 765.9px) {
  .login-wrap {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
