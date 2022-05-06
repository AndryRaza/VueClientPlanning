<template>
  <div class="wrapper">
    <div class="card">
      <div class="error" v-if="error">
        Mot de passe ou Login incorrect
      </div>

      <h1 class="title">Se connecter</h1>
      <form>
        <input type="text" name="login" v-model="login" placeholder="Login" />

        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="Mot de passe"
        />

        <button type="submit" class="submit-btn" @click="tryToLogin">
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      login: "",
      password: "",
      error: false,
    };
  },
  methods: {
    // A COMPLETER QUAND PARTIE API INTEGRE
    tryToLogin: async function(e) {
      e.preventDefault();

      let res = await axios
        .post
        // `${process.env.VUE_APP_URL}/${}/`
        ();

      if (res.status != 200) {
        this.error = true;
      } else {
        this.error = false;
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
#app {
  font-family: Roboto, sans-serif;
}

* {
  margin: 0;
}
.wrapper {
  height: 100vh;
  widows: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(300deg, deepskyblue, #2c80ca, #7d339d);
  background-size: 180% 180%;
  animation: gradient-animation 24s ease infinite;
}
@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.card {
  padding: 40px;
  box-shadow: 5px 5px 5px rgb(0, 0, 0, 0.1);
  width: 30vw;
  height: 30vh;
  border-radius: 10px;
  background: #f2f2f2;
  opacity: 0.8;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form input {
  margin: 10px 0;
  font-size: 15px;
  min-width: 300px;
  min-height: 30px;
  border: none;
  /* border: solid grey 1px; */
  padding: 5px 10px;
  border-radius: 5px;
}

.title {
  margin: 0 0 40px 0;
  font-size: xxx-large;
}

.submit-btn {
  font-size: 15px;
  padding: 10px;
  margin-top: 15px;
  background: rgb(21, 99, 216);
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
}

@media screen and (max-width: 720px) {
  .card {
    width: 100%;
    height: 100%;
    box-shadow: none;
  }

  form input {
    width: 100%;
  }
}
</style>
