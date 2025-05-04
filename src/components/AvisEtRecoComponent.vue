<template>
  <div class="recommend-container">
    <div class="columns">
      <!-- Colonne GAUCHE : Avis -->
      <div class="left-column">
        <div class="avis-bar">
          <img src="@/assets/Avis.png" alt="Avis" class="logo-large" />
          <img src="@/assets/plus.png" alt="Add Review" class="plus-icon" @click="toggleInput" />
        </div>

        <div v-if="showInput" class="input-section">
          <textarea v-model="newReview" placeholder="Écris ton avis ici..." class="input-textarea"></textarea>
          <button @click="submitReview" class="submit-btn">Envoyer</button>
        </div>

        <div class="reviews">
          <div v-for="(review, index) in reviews" :key="index" class="review-block">
            <p class="username">Utilisateur {{ index + 1 }}</p>
            <p class="review-text">{{ review.text }}</p>
          </div>
        </div>
      </div>

      <div class="flame-divider"></div>

      <!-- Colonne DROITE : Question + Pouces centrés -->
      <div class="right-column">
        <p class="big-question">Would you recommend it?</p>
        <div class="thumbs-centered">
          <img src="@/assets/Pouce_rouge.png" alt="Thumbs Down" class="thumb" @click="vote('down')" />
          <img src="@/assets/Pouce_Bleu.png" alt="Thumbs Up" class="thumb" @click="vote('up')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvisEtRecoComponent',
  data () {
    return {
      reviews: [
        { text: 'Incroyable, j’ai adoré l’univers et la musique.' },
        { text: 'Un peu répétitif à la longue mais reste fun.' }
      ],
      showInput: false,
      newReview: ''
    }
  },
  methods: {
    toggleInput () {
      this.showInput = !this.showInput
    },
    submitReview () {
      if (this.newReview.trim()) {
        this.reviews.push({ text: this.newReview.trim() })
        this.newReview = ''
        this.showInput = false
      }
    },
    vote (type) {
      alert(`Tu as voté ${type === 'up' ? '👍' : '👎'}`)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500&display=swap');

.flame-divider {
  width: 6px;
  min-height: 400px;
  border-radius: 3px;
  background: linear-gradient(to bottom, #d400ff, #7300ff, #330066);
  background-size: 100% 300%;
  animation: neonGlow 3s infinite ease-in-out;
  box-shadow: 0 0 14px #ff00ff, 0 0 28px #a500ff;
  align-self: stretch;
}

@keyframes neonGlow {
  0% {
    background-position: 0% 0%;
    box-shadow: 0 0 10px #ff00ff, 0 0 20px #a500ff;
  }
  50% {
    background-position: 0% 100%;
    box-shadow: 0 0 20px #ff66ff, 0 0 40px #cc00ff;
  }
  100% {
    background-position: 0% 0%;
    box-shadow: 0 0 10px #ff00ff, 0 0 20px #a500ff;
  }
}

.recommend-container {
  width: 100%;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  box-sizing: border-box;
  color: white;
}

.columns {
  display: flex;
  gap: 60px;
  align-items: stretch;
}

/* COLONNE GAUCHE */
.left-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.avis-bar {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 25px;
}

.logo-large {
  height: 130px;
}

.plus-icon {
  height: 60px;
  cursor: pointer;
}

.input-section {
  margin-bottom: 30px;
  width: 100%;
  max-width: 500px;
}

.input-textarea {
  width: 100%;
  min-height: 120px;
  padding: 16px;
  border-radius: 8px;
  font-size: 17px;
  font-family: 'Rajdhani', sans-serif;
  resize: none;
  border: none;
  background-color: #1e1e1e;
  color: white;
}

.submit-btn {
  margin-top: 12px;
  background-color: #FFD700;
  border: none;
  padding: 12px 26px;
  border-radius: 6px;
  font-size: 16px;
  color: black;
  font-weight: bold;
  cursor: pointer;
}

.reviews {
  padding-top: 10px;
}

.review-block {
  margin-bottom: 20px;
}

.username {
  margin: 0;
  font-weight: bold;
  color: #FFD700;
  font-size: 16px;
  font-family: 'Orbitron', sans-serif;
}

.review-text {
  font-family: 'Rajdhani', sans-serif;
  font-size: 18px;
  color: white;
}

/* COLONNE DROITE */
.right-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.big-question {
  font-size: 36px;
  font-family: 'Orbitron', sans-serif;
  color: #FFD700;
  margin-bottom: 30px;
}

.thumbs-centered {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.thumb {
  width: 70px;
  height: 70px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.thumb:hover {
  transform: scale(1.1);
}

</style>
