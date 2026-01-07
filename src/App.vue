<template>
  <div id="app" class="app">
    <div>
      <NavBar @openConnexion="toggleConnexion" />
    </div>
    <router-link to="/"></router-link>
    <div class="content">
      <router-view></router-view>
    </div>
    <FooterComponent></FooterComponent>
    <!-- <router-link to="/"></router-link> -->
    <!--<div class="content">-->
      <!--<router-view></router-view>-->
    <!--</div>-->
    <!--<PageFooter />-->
    <ConnexionPanel :visible="showConnexion" @connected="handleConnexionSuccess" @close="showConnexion = false" />
    <!-- Bouton flottant -->
    <div>
    <button
      class="ai-chat-launcher"
      type="button"
      aria-label="Ouvrir le chat IA"
      @click="toggleChat"
    >
      💬
    </button>

      <div v-if="chatOpen" class="ai-chat-window">
        <div class="ai-chat-header">
          <span>Assistant NextQuest</span>
          <button class="ai-chat-close" @click="toggleChat">✕</button>
        </div>

        <!-- Messages -->
        <div ref="chatBody" class="ai-chat-body">
          <div
            v-for="(msg, index) in chatMessages"
            :key="index"
            class="ai-chat-message"
            :class="msg.role"
          >
            <div class="ai-chat-bubble">
              {{ msg.content }}
            </div>
          </div>
        </div>

        <!-- Input -->
        <form class="ai-chat-input" @submit.prevent="sendMessage">
          <input
            v-model="chatDraft"
            type="text"
            placeholder="Pose une question sur un jeu…"
            autocomplete="off"
          />
          <button type="submit" :disabled="chatLoading || !chatDraft">Envoyer</button>
        </form>
      </div>

    </div>


  </div>

</template>

<script>
import ConnexionPanel from './components/ConnexionPanel.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    NavBar: () => import('./components/NavBar.vue'),
    FooterComponent: () => import('./components/FooterComponent.vue'),
    ConnexionPanel
  },
  data: () => ({
    showConnexion: false,
    chatOpen: false,
    chatLoading: false,

    chatDraft: '',
    chatMessages: [
      {
        role: 'assistant',
        content: '👋 Salut ! Je peux t’aider à trouver des infos sur des jeux vidéo.'
      }
    ]
  }),
  methods: {
    ...mapActions(['converseWithAiStore']),
    toggleConnexion () {
      this.showConnexion = !this.showConnexion
    },
    handleConnexionSuccess () {
      this.showConnexion = false
      // log utilisateur, redirection, etc.
    },
    toggleChat () {
      this.chatOpen = !this.chatOpen
      this.$nextTick(this.scrollToBottom)
    },


    async sendMessage () {
      if (!this.chatDraft) return

      const question = this.chatDraft.trim()
      if (!question) return

      // Reset input tout de suite
      this.chatDraft = ''

      // Push user message
      this.chatMessages.push({ role: 'user', content: question })
      this.$nextTick(this.scrollToBottom)

      try {
        // Appel store -> service -> API
        this.chatLoading = true
        const answer = await this.converseWithAiStore(question)

        // Push assistant answer
        this.chatMessages.push({
          role: 'assistant',
          content: answer || "Je n'ai pas de réponse pour le moment."
        })
      } catch (error) {
        console.error("Erreur lors de la conversation avec l'IA :", error)
        this.chatMessages.push({
          role: 'assistant',
          content: "⚠️ Impossible de contacter l'API pour le moment."
        })
      } finally {
        this.chatLoading = false
        this.$nextTick(this.scrollToBottom)
      }
    },

    scrollToBottom () {
      this.$nextTick(() => {
        const el = this.$refs.chatBody
        if (el) {
          el.scrollTop = el.scrollHeight
        }
      })
    }
  }
}

</script>

<style>
  .app {
    background-color: #180342;
  }

  /* Bouton flottant */
  .ai-chat-launcher {
    position: fixed;
    left: 18px;
    bottom: 18px;
    z-index: 9999;

    width: 54px;
    height: 54px;
    border-radius: 50%;
    border: none;

    font-size: 22px;
    cursor: pointer;

    background: rgba(30, 30, 30, 0.9);
    color: white;

    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
  }

  /* Fenêtre de chat */
  .ai-chat-window {
    position: fixed;
    left: 18px;
    bottom: 82px;
    z-index: 9999;

    width: 320px;
    height: 420px;

    background: rgba(20, 20, 20, 0.96);
    border-radius: 14px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);

    display: flex;
    flex-direction: column;
    color: white;

    overflow: hidden;
  }

  /* Header */
  .ai-chat-header {
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;

    padding: 12px;
    font-weight: bold;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }

  /* Bouton fermer */
  .ai-chat-close {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }

  .ai-chat-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;

    padding: 12px;
    box-sizing: border-box;
  }

  .ai-chat-placeholder {
    opacity: 0.7;
    font-size: 14px;
  }

  /* Messages */
  .ai-chat-message {
    display: flex;
    margin-bottom: 10px;
  }

  .ai-chat-message.user {
    justify-content: flex-end;
  }

  .ai-chat-message.assistant {
    justify-content: flex-start;
  }

  .ai-chat-bubble {
    max-width: 80%;
    padding: 10px 12px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.3;
    background: rgba(255, 255, 255, 0.08);
  }

  .ai-chat-message.user .ai-chat-bubble {
    background: rgba(255, 215, 0, 0.25);
  }

  /* Input */
  .ai-chat-input {
    display: flex;
    align-items: center;
    gap: 8px;

    padding: 10px;
    box-sizing: border-box;

    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    flex-shrink: 0;
  }

  .ai-chat-input input {
    flex: 1;
    min-width: 0;

    height: 38px;
    padding: 0 12px;

    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.25);

    background: rgba(255, 255, 255, 0.08);
    color: white;
  }


  .ai-chat-input button {
    flex-shrink: 0;
    flex-shrink: 0;
    height: 38px;
    padding: 0 14px;

    border-radius: 8px;
    border: none;

    background: #ffd700;
    color: #180342;
    font-weight: bold;

    cursor: pointer;
  }
  .ai-chat-input input::placeholder {
    color: rgba(255, 255, 255, 0.6); /* placeholder lisible */
  }


  .ai-chat-input button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
