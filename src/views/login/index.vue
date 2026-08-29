<template>
  <div class="login-page">
    <div class="login-header">
      <h2>欢迎登录</h2>
      <p>Vue3 H5 Mall Template</p>
    </div>

    <van-form @submit="onSubmit" class="login-form">
      <van-field
        v-model="phone"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]"
      />
      <van-field
        v-model="code"
        name="code"
        label="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #button>
          <van-button size="small" type="primary" :disabled="countdown > 0" @click="sendCode">
            {{ countdown > 0 ? `${countdown}s后重发` : '发送验证码' }}
          </van-button>
        </template>
      </van-field>

      <div class="submit-wrap">
        <van-button round block type="danger" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user.store'
import { sendCodeApi, loginApi } from '@/api/user'

// definePageMeta({ layout: 'BlankLayout' })

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const phone = ref('')
const code = ref('')
const countdown = ref(0)

const sendCode = async () => {
  if (!/^1[3-9]\d{9}$/.test(phone.value)) {
    showToast('请输入正确的手机号')
    return
  }
  await sendCodeApi({ phone: phone.value })
  showToast('验证码已发送')
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)
}

const onSubmit = async () => {
  const res = await loginApi({ phone: phone.value, code: code.value })

  userStore.setToken(res.data.token)
  userStore.setUserInfo(res.data.userInfo)
  showToast('登录成功')

  const redirect = route.query.redirect as string
  router.replace(redirect || '/')
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: #fff;
  padding: 60px 24px 0;
}

.login-header {
  margin-bottom: 40px;
  h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  p {
    font-size: 14px;
    color: #999;
    margin-top: 8px;
  }
}

.submit-wrap {
  margin-top: 24px;
}
</style>
