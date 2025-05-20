<template>
  <footer class="site-footer">
    <div class="footer-content">
      <img src="../assets/NextQuest.png" alt="Logo" class="footer-logo" />
      <div class="footer-right">
        <p class="footer-text">© 2025 Nathan MARECHAL. Tous droits réservés.</p>
        <a href="/CGU" target="_blank" class="cgu-link">CGU</a>
      </div>
    </div>
  </footer>
</template>

<script>

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

.footer-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.footer-text {
  color: #ccc;
  font-size: 14px;
  margin: 0;
}

.cgu-link {
  color: #FFD700;
  font-size: 14px;
  text-decoration: underline;
  margin-top: 4px;
}
</style>
