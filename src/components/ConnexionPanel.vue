<template>
  <transition name="slide">
    <div v-if="visible" class="connexion-panel">
      <div class="header">
        <h2>{{ isSignup ? 'Inscription' : 'Connexion' }}</h2>
        <span class="close-btn" @click="$emit('close')">&times;</span>
      </div>

      <form @submit.prevent="submitForm">
        <div v-if="isSignup" class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" required />
        </div>

        <div class="form-group">
          <label>Nom d'utilisateur</label>
          <input type="text" v-model="username" required />
        </div>

        <div class="form-group">
          <label>Mot de passe</label>
          <input type="password" v-model="password" required />
        </div>

        <button type="submit" class="submit-btn">
          {{ isSignup ? 'Créer un compte' : 'Se connecter' }}
        </button>
      </form>

      <button class="switch-btn" @click="isSignup = !isSignup">
        {{ isSignup ? 'Déjà un compte ? Connexion' : 'Pas encore inscrit ? Créer un compte' }}
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ConnexionPanel',
  props: ['visible'],
  data () {
    return {
      isSignup: false,
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
    submitForm () {
      const payload = {
        mode: this.isSignup ? 'signup' : 'login',
        email: this.email,
        username: this.username,
        password: this.password
      }
      this.$emit('connected', payload)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500&display=swap');

.connexion-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100%;
  background-color: #180342;
  color: white;
  padding: 20px;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.5);
  z-index: 999;
  font-family: 'Rajdhani', sans-serif;
}

.header {
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Orbitron', sans-serif;
  font-size: 22px;
  color: #FFD700;
}

.close-btn {
  font-size: 28px;
  cursor: pointer;
  color: #FFD700;
  line-height: 1;
}

form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 15px;
  color: #FFD700;
}

input {
  padding: 10px 12px;
  border-radius: 6px;
  border: none;
  font-size: 15px;
  background-color: #ffffff;
  color: #000000;
}

.submit-btn {
  margin-top: 15px;
  background-color: #FFD700;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  color: #180342;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
}

.switch-btn {
  margin-top: 25px;
  background: none;
  border: none;
  color: #FFD700;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  font-family: 'Rajdhani', sans-serif;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}
</style>
