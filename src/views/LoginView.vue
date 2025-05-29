<template>
  <div class="container">
    <div class="form-register">
      <form @submit.prevent="login">
        <input type="email" placeholder="email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <button type="submit">submit</button>
      </form>
      <RouterLink to="/register"> You dont have account? </RouterLink>

    </div>

  </div>
</template>

<script lang="js">
export default {
  data() {
    return {
      email: "",
      password: "",
      message: ""
    }
  },
  methods: {
    async login() {
      const Login_fetch = await fetch('http://localhost:3500/user/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });

      if (Login_fetch.ok) {
        const res = await Login_fetch.json()
        console.log(res)

        localStorage.setItem("chatio_token", res.token)
        this.message = res.message
        this.email = ""
        this.password = ""
      }
    },
  }
}
</script>

<style>
.form-register {
  background-color: #1f222a;
  width: 300px;
  padding: 26px;
  border-radius: 20px;
  margin-left: 500px;
  margin-top: 300px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

input,
button {
  padding: 8px;
  margin-top: 10px;
  border-radius: 10px;
  border: none;
  background-color: #1f222a;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  border: 1px solid #444;
}

button {
  color: white;

}
</style>
