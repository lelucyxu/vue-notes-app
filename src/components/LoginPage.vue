<template>
    <div class="login-container">
        <div class="top-bar">
            <h1 class="heading">BGC Notes Tool Login</h1>
        </div>
        <div class="input-group">
            <label>Email:</label>
            <input type="email" v-model="email" required />
            <label>Password:</label>
            <input type="password" v-model="password" required />
        </div>
        <div class="login-card" @click="navigateTo('home')">
            <button type="submit" class="login-button">Login</button>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
    name: 'LoginPage',
    setup() {
        const router = useRouter()
        const email = ref('')
        const password = ref('')
        
        const navigateTo = (mode) => {
            router.push({ name: mode })
        }
        
        return {
            navigateTo,
            email,
            password
        }
    }
}
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f5f7fa;
}

.top-bar {
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.heading {
    margin: 0;
    color: #333;
    font-size: 24px;
    font-weight: 600;
}

.input-group {
    margin-bottom: 12px;
}

.input-group label {
    display: block;
    margin-bottom: 4px;
    font-weight: 600;
}

.input-group input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.login-card {
    display: flex;
    gap: 30px;
    justify-content: center;
    max-width: 1000px;
    width: 100%;
}

.login-button {
    background-color: #3986A8;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 12px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    align-self: flex-start;
}

.login-button:hover {
    background-color: #2c6b8a;
}
</style>