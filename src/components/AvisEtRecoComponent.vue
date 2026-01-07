<template>
  <div class="recommend-container">
    <div class="columns">
      <!-- Colonne GAUCHE : Avis -->
      <div class="left-column">
        <div class="avis-bar">
          <img src="@/assets/Avis.png" alt="Avis" class="logo-large" />
          <img v-if="isAuthenticated" src="@/assets/plus.png" alt="Add Review" class="plus-icon" @click="toggleInput" />
        </div>

        <div v-if="isAuthenticated">
          <div v-if="showInput" class="input-section">
            <textarea v-model="newReview" placeholder="write your review here..." class="input-textarea"></textarea>
            <div class="thumb-selection">
              <img
                src="@/assets/Pouce_Bleu.png"
                alt="Thumbs Up"
                class="thumb"
                :class="{ selected: reviewScore === 1 }"
                @click="selectReviewScore(1)"
              />
              <img
                src="@/assets/Pouce_rouge.png"
                alt="Thumbs Down"
                class="thumb"
                :class="{ selected: reviewScore === -1 }"
                @click="selectReviewScore(-1)"
              />
            </div>
            <button @click="submitReview" class="submit-btn">Envoyer</button>
          </div>
        </div>

        <div class="reviews">
          <div v-for="(review, index) in reviews" :key="index" class="review-block">
            <div class="review-card">
              <p class="username">{{ review.user_name || 'Utilisateur anonyme' }}</p>
              <p class="review-text">{{ review.review }}</p>
              <img
                :src="review.review_score === 1 ? require('@/assets/Pouce_Bleu.png') : require('@/assets/Pouce_rouge.png')"
                alt="Review Score"
                class="review-thumb"
              />
              <p class="review-date">{{ review.date_review }}</p>
            </div>
          </div>
        </div>

        <div class="buttons-container">
          <button class="load-more-btn" @click="loadMoreReviews">Charger plus</button>
          <button class="load-less-btn" @click="loadLessReviews" :disabled="offset === 0">Charger moins</button>
        </div>
      </div>

      <div class="flame-divider"></div>

      <!-- Colonne DROITE : Question + Pouces centrés -->
      <div class="right-column">
        <p class="big-question">Did you like this game ?</p>
        <div class="thumbs-centered">
          <img
            src="@/assets/Pouce_rouge.png"
            alt="Thumbs Down"
            class="thumb"
            :class="{ selected: isLiked === -1 }"
            @click="toggleLike(-1)"
          />
          <img
            src="@/assets/Pouce_Bleu.png"
            alt="Thumbs Up"
            class="thumb"
            :class="{ selected: isLiked === 1 }"
            @click="toggleLike(1)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AvisEtRecoComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    app_id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      reviews: [],
      showInput: false,
      newReview: '',
      reviewScore: null,
      isLiked : null,
      offset: 0,
      limit: 5
    }
  },
  computed:{
    ...mapState(['userToken', 'userEmail', 'userId']),
    isAuthenticated() {
      return !!this.userToken
    }
  },
  created () {
    this.checkUserLike()
    this.getReview(this.title)
    console.log('AvisEtRecoComponent created')
    console.log(this.title)
    console.log(this.app_id)
  },
  methods: {
    ...mapActions(['getReviewByGameName', 'postReviewStore', 'isLikedStore', 'likeGameStore']),

    async getReview (gameName) {
      try {
        const response = await this.getReviewByGameName({ game_name: gameName, offset: this.offset, limit: this.limit })
        this.reviews = [...this.reviews, ...(response || [])]
      } catch (error) {
        console.error('Erreur lors de la récupération des avis :', error)
      }
    },

    async toggleLike(likeValue) {
      try {
        const liked = likeValue === 1;
        await this.likeGameStore({ user_id: this.userId, app_id: this.app_id, liked });

        // Met à jour l'état local après succès
        this.isLiked = this.isLiked === likeValue ? 0 : likeValue;
      } catch (error) {
        console.error('Erreur lors du like/dislike :', error);
      }
    },


    async checkUserLike() {
      try {
        const appId = parseInt(this.app_id, 10);
        const userIdNumber = parseInt(this.userId, 10);
        const result = await this.isLikedStore({ user_id: userIdNumber, app_id: appId });
        if (result === 1) {
          this.isLiked = 1;
        } else if (result === -1) {
          this.isLiked = -1;
        } else {
          this.isLiked = 0;
        }
      } catch (error) {
        console.error(error);
      }
    },

    loadLessReviews() {
      if (this.offset > 0) {
        this.offset -= this.limit;
        this.reviews = this.reviews.slice(0, this.offset);
      }
    },

    loadMoreReviews () {
      this.offset += this.limit
      this.getReview(this.title)
    },

    toggleInput () {
      this.showInput = !this.showInput
    },

    selectReviewScore (score) {
      this.reviewScore = score
    },

    async submitReview () {
      if (this.newReview.trim() && this.reviewScore !== null) {
        try {
          const appId = parseInt(this.app_id, 10);
          if (isNaN(appId)) {
            throw new Error('app_id doit être un entier valide.');
          }

          const response = await this.postReviewStore({
            id_user: this.userId,
            app_id: appId,
            review: this.newReview.trim(),
            review_score: this.reviewScore,
            date_review: new Date().toISOString().split('T')[0],
            name_user: this.userEmail || 'Utilisateur anonyme'
          });
          console.log('Avis envoyé :', response);

          this.reviews.push({
            user_name: this.userEmail || 'Utilisateur anonyme',
            review: this.newReview.trim(),
            review_score: this.reviewScore,
            date_review: new Date().toISOString().split('T')[0]
          });

          this.newReview = '';
          this.reviewScore = null;
          this.showInput = false;
        } catch (error) {
          console.error('Erreur lors de l\'envoi de l\'avis :', error);
        }
      } else {
        alert('Veuillez remplir le texte de l\'avis et sélectionner un pouce.');
      }
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

.review-card {
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 500px;
  text-align: left;
  color: white;
  font-family: 'Rajdhani', sans-serif;
  position: relative;
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
  display: flex;
  justify-content: center;
}
.username {
  font-weight: bold;
  color: #ffd700;
  font-size: 16px;
  margin-bottom: 10px;
}

.review-text {
  font-size: 18px;
  margin-bottom: 10px;
}

.review-thumb {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 20px;
  right: 20px;
}

.review-date {
  font-size: 14px;
  color: #aaa;
  margin-top: 10px;
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

.buttons-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.load-less-btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #ff4d4d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.load-less-btn:disabled {
  background-color: #888;
  cursor: not-allowed;
}

.load-less-btn:hover:not(:disabled) {
  background-color: #ff3333;
}

.load-more-btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #FFD700;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.load-more-btn:hover {
  background-color: #FFC300;
}

.thumb-selection {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 10px;
}

.thumb {
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.thumb.selected {
  transform: scale(1.2);
  border: 2px solid #FFD700;
  border-radius: 50%;
}

.thumb:not(.selected) {
  border: none;
}

</style>
