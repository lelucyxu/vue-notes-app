<template>
    <div class="login-container">
        <div class="top-bar">
            <h1 class="heading">BGC Notes Tool Login</h1>
        </div>
        <div class="main-content">
            <div class="input-group">
                <label>Email:</label>
                <input type="email" v-model="email" required />
                <label>Password:</label>
                <input type="password" v-model="password" required />
                <div class="login-card" @click="navigateTo('home')">
                    <button type="submit" class="login-button">Login</button>
                </div>
            </div>
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

.main-content {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-group {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 8px;
  padding: 50px;
  flex: 1;
  max-width: 400px;
  width: 100%;
  max-height: 300px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.input-group:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.input-group label {
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
    color: #3986A8;
    font-size: 20px;
    text-align: left;
}

.input-group input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-bottom: 40px;
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
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    align-self: flex-start;
}

.login-button:hover {
    background-color: #2c6b8a;
}
</style>