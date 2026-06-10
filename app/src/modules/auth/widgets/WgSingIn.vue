<script setup lang="ts">
import VimTextbox from '@/shared/components/VimTextbox.vue'
import VimButton from '@/shared/components/VimButton.vue'
import { computed, ref } from 'vue'
import type { RegistrationFormInterface } from '@/modules/auth/interfaces/registration-form.interface.ts'
import { useMutation } from '@tanstack/vue-query'
import { AUTH_API } from '@/modules/auth/api/auth.ts'
import type { AxiosError } from 'axios'
import VimSnackBar from '@/shared/components/VimSnackBar.vue'

const againPassword = ref<string>('')

const snackText = ref<string>('')

const form = ref<RegistrationFormInterface>({
  birthday: '',
  email: '',
  password: '',
  username: '',
})
const code = ref(['', '', '', '', '', ''])
const resendTimer = ref(60)
const confirmCode = computed(() => code.value.join(''))

const birthdayInvalid = ref<boolean>(false)
const emailInvalid = ref<boolean>(false)
const passwordInvalid = ref<boolean>(false)
const againPasswordInvalid = ref<boolean>(false)
const usernameInvalid = ref<boolean>(false)

const isVerificateCode = ref<boolean>(false)
const isSnackBarView = ref<boolean>(false)

let timerInterval: ReturnType<typeof setInterval> | null = null

const resendButtonText = computed(() => {
  return resendTimer.value > 0
    ? `Отправить повторно через ${resendTimer.value}с`
    : 'Отправить код ещё раз'
})

function startResendTimer() {
  if (timerInterval) {
    clearInterval(timerInterval)
  }

  resendTimer.value = 60
  timerInterval = setInterval(() => {
    resendTimer.value--
    if (resendTimer.value <= 0) {
      if (timerInterval) {
        clearInterval(timerInterval)
        timerInterval = null
      }
    }
  }, 1000)
}

function handleCodeInput(event: Event, index: number) {
  const target = event.target as HTMLInputElement
  code.value[index] = target.value.slice(0, 1)
  if (target.value && index < 5) {
    const next = document.querySelectorAll<HTMLInputElement>('.code-input')[index + 1]
    next?.focus()
  }
  if (confirmCode.value.length === 6) {
    verifyAccount()
  }
}

const { mutate: createAccount, isPending } = useMutation({
  mutationFn: async () => {
    return await AUTH_API.createAccount(form.value)
  },
  onError: (err: AxiosError) => {
    isSnackBarView.value = true
    const statusCode = err.response?.status
    if (statusCode === 422) {
      snackText.value = 'Почта уже занята'
    } else if (statusCode === 400) {
      snackText.value = 'Ошибка валидации'
    } else {
      snackText.value = 'Попробуйте позже. Сервер перегружен'
    }
  },
  onSuccess: async (data: { id: number }) => {
    if (data.id) {
      isVerificateCode.value = true
      startResendTimer()
    }
  },
})

const { mutate: verifyAccount } = useMutation({
  mutationFn: () => AUTH_API.confirmAccount(form.value.email, confirmCode.value),

  onSuccess() {
    snackText.value = 'Аккаунт подтвержден'
    isSnackBarView.value = true
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  },

  onError() {
    snackText.value = 'Неверный код'
    isSnackBarView.value = true
  },
})

const { mutate: resendCode } = useMutation({
  mutationFn: () => AUTH_API.sendConfirmCodeAgain(form.value.email),
  onSuccess() {
    snackText.value = 'Код отправлен повторно'
    isSnackBarView.value = true
    startResendTimer()
  },
})

function handleCreateAccount(): void {
  usernameInvalid.value = false
  passwordInvalid.value = false
  againPasswordInvalid.value = false
  birthdayInvalid.value = false
  emailInvalid.value = false

  if (form.value.username.trim() === '') {
    usernameInvalid.value = true
  }
  if (form.value.password.trim() === '') {
    passwordInvalid.value = true
    againPasswordInvalid.value = true
  }
  if (form.value.birthday.trim() === '') {
    birthdayInvalid.value = true
  }
  if (form.value.email.trim() === '') {
    emailInvalid.value = true
  }
  if (form.value.password !== againPassword.value) {
    againPasswordInvalid.value = true
  }
  if (
    birthdayInvalid.value ||
    emailInvalid.value ||
    passwordInvalid.value ||
    againPasswordInvalid.value ||
    usernameInvalid.value
  ) {
    return
  }
  createAccount()
}
import { onUnmounted } from 'vue'
onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>

<template>
  <div class="wrapper">
    <div v-if="!isVerificateCode" class="form">
      <VimTextbox
        type="text"
        label="никнейм"
        v-model="form.username"
        :is-invalid="usernameInvalid"
        @input="usernameInvalid = false"
      />
      <VimTextbox
        type="date"
        label="дата рождения"
        v-model="form.birthday"
        :is-invalid="birthdayInvalid"
        @input="birthdayInvalid = false"
      />
      <VimTextbox
        type="email"
        label="электронная почта"
        v-model="form.email"
        :is-invalid="emailInvalid"
        @input="emailInvalid = false"
      />
      <VimTextbox
        type="password"
        label="пароль"
        v-model="form.password"
        :is-invalid="passwordInvalid"
        @input="passwordInvalid = false"
      />
      <VimTextbox
        type="password"
        v-model="againPassword"
        label="пароль (ещё раз)"
        :is-invalid="againPasswordInvalid"
        @input="againPasswordInvalid = false"
      />
      <VimButton :disabled="isPending" text="зарегистрироваться" @click="handleCreateAccount()" />
    </div>
    <div v-else class="verification">
      <h3>Введите код подтверждения</h3>

      <div class="code-container">
        <input
          v-for="(_, index) in code"
          :key="index"
          class="code-input"
          maxlength="1"
          type="text"
          inputmode="numeric"
          @input="handleCodeInput($event, index)"
        />
      </div>

      <VimButton
        style="max-width: 300px"
        class="resend-button"
        :disabled="resendTimer > 0"
        @click="resendCode()"
        :text="resendButtonText"
      />
    </div>
  </div>
  <VimSnackBar
    v-if="isSnackBarView"
    :title="snackText"
    type="error"
    @close="isSnackBarView = false"
  />
</template>

<style scoped>
.wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.form {
  margin: 0 15px;
}

.form > * {
  margin: 10px 0;
}

.verification {
  margin: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.verification > * {
  margin: 10px 0;
}

.code-container {
  margin: 0 15px;
}

.code-input {
  margin: 0 15px;
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 24px;
  border: 2px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

.code-input:focus {
  border-color: #66ff00;
  outline: none;
}
</style>
