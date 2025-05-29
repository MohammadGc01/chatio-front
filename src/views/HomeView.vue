<template>
  <main>
    <div class="row me-1 p-5">
      <div class="col-sm-12 col-md-5">
        <img src="/logo.png" class="logo" alt="logo">
      </div>
      <div class="col-sm-12 col-md-5 text">
        <h3>💬 Chatio – Real-Time Chat Application</h3>
        <p>
          Chatio is a modern, responsive real-time chat application designed for seamless
          communication between users. Built with cutting-edge web technologies,
          Chatio offers a smooth and engaging messaging experience that's perfect for individuals, teams, or
          communities.
        </p>
        <div class="row">
          <RouterLink to="/login" class="login-btn">
            login
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {

    }
  },

}
</script>

<style scoped>
.logo {
  width: 500px !important;
}

.text {
  padding-top: 10% !important;
}

.login-btn {
  text-decoration: none;
  color: white;
  background-color: rgb(42, 42, 82) !important;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 30px;
  width: 100px;
  border-radius: 20px;
}
</style>
