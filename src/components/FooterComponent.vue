<template>
  <footer class="site-footer">
    <div class="footer-content">
      <img src="@/assets/NextQuest.png" alt="Logo" class="footer-logo" />
      <p class="footer-text">© 2025 Nathan MARECHAL. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    logo: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.site-footer {
  width: 100%;
  padding: 24px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to bottom, #180342, #000000);
}

.footer-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.footer-logo {
  height: 72px;
}

.footer-text {
  color: #ccc;
  font-size: 14px;
  text-align: right;
}
</style>
