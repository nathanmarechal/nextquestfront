<template>
  <section class="user-info-container">
    <h2 class="title">User Profile</h2>

    <!-- Affichage classique -->
    <div v-if="!isEditing" class="info-display">
      <p><span>Name:</span> {{ name }}</p>
      <p><span>Email:</span> {{ email }}</p>
      <p><span>Birthdate:</span> {{ birthdate }}</p>
      <p class="password-line">
        <span>Password:</span> ********
        <button class="link-btn" @click="$emit('change-password')">Change Password</button>
      </p>
      <!-- Section dissociée avec boutons -->
      <div class="stats-section">
        <button class="stats-btn" @click="$emit('show-reviews')">
          Reviews: {{ numberofreviews }}
        </button>
        <button class="stats-btn" @click="$emit('show-liked')">
          Games Liked: {{ gamesliked }}
        </button>
        <button class="stats-btn" @click="$emit('show-disliked')">
          Games Disliked: {{ gamesdisliked || 0 }}
        </button>
      </div>


      <button class="btn edit" @click="toggleEdit">Edit</button>
    </div>

    <!-- Mode édition -->
    <div v-else class="info-edit">
      <label>Name: <input v-model="name" /></label>
      <label>Email: <input v-model="email" /></label>
      <label>Birthdate: <input type="date" v-model="birthdate" /></label>

      <div class="button-group">
        <button class="btn save" @click="saveChanges">Save</button>
        <button class="btn cancel" @click="toggleEdit">Cancel</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UserInfoComponent',
  props: {
    user: { type: Object, required: true }
  },
  data () {
    return {
      name: 'blue',
      email: 'bleu@mail.com',
      birthdate: '2000-01-01',
      password: 'password123',
      numberofreviews: 10,
      gamesliked: 5,
      gamesdilsiked: 2,
      isEditing: false,
    };
  },
  methods: {
    toggleEdit () {
      this.isEditing = !this.isEditing;
    },
    saveChanges () {
      this.$emit('update-user', {
        name: this.name,
        email: this.email,
        birthdate: this.birthdate,
        password: this.password,
        numberofreviews: this.numberofreviews,
        gamesliked: this.gamesliked,
        gamesdisliked: this.gamesdisliked
      });
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
.user-info-container {
  max-width: 700px;
  margin: 4rem auto;
  padding: 0 1rem;
  text-align: left;
  color: white;
  font-family: 'Rajdhani', sans-serif;
}

.title {
  text-align: center;
  font-size: 2.2rem;
  color: #FFD700;
  margin-bottom: 2.5rem;
  text-shadow: 0 0 10px #FFD70077;
}

.info-display p {
  margin: 1rem 0;
  font-size: 1.1rem;
  color: #00ffff;
}

.info-display span {
  color: #ffffff;
  font-weight: bold;
  margin-right: 0.5rem;
}

.info-edit label {
  display: block;
  margin-bottom: 1.2rem;
  color: white;
  font-size: 1rem;
}

.info-edit input {
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.4rem;
  background-color: transparent;
  border: 1px solid #00ffff;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
  box-shadow: 0 0 5px #00ffff33;
}

.info-edit input:focus {
  outline: none;
  box-shadow: 0 0 10px #00ffff;
  border-color: #00ffff;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
}

/* Stylisation des boutons */
.btn {
  padding: 0.7rem 1.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  border-radius: 5px;
  border: 1px solid transparent;
  font-weight: bold;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}

.btn.edit {
  color: #00ffff;
  border: 1px solid #00ffff;
}
.btn.edit:hover {
  background: #00ffff;
  color: #0a001f;
  box-shadow: 0 0 12px #00ffff;
}

.btn.save {
  color: #28a745;
  border: 1px solid #28a745;
}
.btn.save:hover {
  background: #28a745;
  color: #0a001f;
  box-shadow: 0 0 12px #28a745;
}

.btn.cancel {
  color: #ff0055;
  border: 1px solid #ff0055;
}
.btn.cancel:hover {
  background: #ff0055;
  color: #0a001f;
  box-shadow: 0 0 12px #ff0055;
}

.stats-section {
  margin: 2.5rem 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stats-btn {
  background-color: transparent;
  border: 1px solid #FFD700;
  color: #FFD700;
  font-size: 1rem;
  font-family: 'Rajdhani', sans-serif;
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
  text-align: center;
  transition: all 0.25s ease-in-out;
  box-shadow: 0 0 0 transparent;
  cursor: pointer;
}

.stats-btn:hover {
  background-color: #FFD700;
  color: #0a001f;
  box-shadow: 0 0 15px #FFD700aa;
}


.password-line {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  font-size: 1rem;
}

.link-btn {
  background: none;
  border: none;
  color: #00ffff;
  font-size: 0.95rem;
  cursor: pointer;
  font-family: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.link-btn:hover {
  color: #FFD700;
  text-decoration: underline;
}
</style>
