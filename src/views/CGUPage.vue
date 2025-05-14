<template>
  <div class='cgu-container'>
    <h1 class="header">Conditions Générales d'Utilisation</h1>
    <div class='cgu-content'>
      <section v-for='(section, index) in sections' :key='index'>
        <h2>{{ section.title }}</h2>
        <p v-for='(para, pIndex) in section.content' :key='pIndex'>{{ para }}</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CGU',
  data () {
    return {
      sections: [
        {
          title: '1. Objet',
          content: [
            'Les présentes Conditions Générales d Utilisation (CGU) régissent l utilisation du site de recommandation de jeux vidéo mis à disposition gratuitement.'
          ]
        },
        {
          title: '2. Accès au service',
          content: [
            'Le site est accessible gratuitement à toute personne disposant d’une connexion Internet.',
            'Certains services peuvent nécessiter la création d’un compte utilisateur.'
          ]
        },
        {
          title: '3. Données personnelles',
          content: [
            'Aucune donnée personnelle n’est collectée sans votre consentement.',
            'Conformément à la législation en vigueur, vous disposez d’un droit d’accès, de rectification et de suppression de vos données.'
          ]
        },
        {
          title: '4. Propriété intellectuelle',
          content: [
            'Les contenus du site (textes, images, algorithmes, etc.) sont protégés par les lois relatives à la propriété intellectuelle.'
          ]
        },
        {
          title: '5. Responsabilités',
          content: [
            'L’auteur du site ne peut être tenu responsable des dommages liés à l utilisation ou à l impossibilité d utiliser le site.'
          ]
        },
        {
          title: '6. Modifications',
          content: [
            'Les CGU peuvent être modifiées à tout moment. L’utilisateur est invité à consulter régulièrement la dernière version.'
          ]
        },
        {
          title: '7. Loi applicable',
          content: [
            'Les présentes CGU sont régies par la loi française. En cas de litige, les tribunaux compétents seront ceux de Paris.'
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.cgu-container {
  padding: 2rem;
  max-width: 800px;
  margin: auto;
  font-family: Arial, sans-serif;
}

.cgu-content {
  margin-top: 1rem;
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  max-height: 600px;
  overflow-y: auto;
}

h1 {
  text-align: center;
  font-size: 2rem;
}

h2 {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #333;
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
</style>
