<template>

    <div class="wrapper">
        <div class="card">
            <div class="error" v-if="error">
              Mot de passe ou login incorrect
            </div> 

            <h1 class="title">Se connecter</h1>
            <form>
                <input 
                    type="text" 
                    name="login" 
                    v-model="login" 
                    placeholder="Login"
                />

                <input 
                    type="password"     
                    name="password" 
                    v-model="password" 
                    placeholder="Mot de passe"
                />

                <button type="submit" class="submit-btn" @click="tryToLogin">Se connecter</button>
            </form>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
    data : function () {
        return {
            login: "",
            password: "",
            error: false
        }
    },
    methods: {
        tryToLogin: async function (e) {
            e.preventDefault();

            try  {
                let res = await axios.post(`${process.env.VUE_APP_URL}/auth/login/`, {
                    email: this.login,
                    password: this.password
                });

                if (res.status != 200) {
                    this.error = true;
                    return;
                } 
                
                let data = res.data;
                let token = `Bearer ${data['access_token']}`;
                let payload = {
                    token,
                    userId: jwt_decode(data['access_token']).userId,
                    roleId: jwt_decode(data['access_token']).role
                }

                this.error = false;
                this.$store.commit('setInfos', payload);
                this.$store.commit('setIsLogged', true);
                this.$store.dispatch('checkTokenExpirationDate');
                
                this.$router.push({
                    name:'Planning',
                    params: {id: payload.userId}
                });
            } catch (e) {
                console.error("Error", e);
                this.error = false;
            }
        
        },
    }
}
</script>

<style scoped>

.wrapper {
    height: 100vh;
    widows: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card {
    padding: 40px;
    box-shadow: 5px 5px 5px rgb(0,0,0,0.1);
    width:40vw;
    height:40vh;
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
    border:none;
    border: solid grey 2px;
    border-radius: 0;
}



.title {
    margin:0 0 40px 0;
    font-size: xxx-large;
}

.submit-btn {
    font-size: 15px;
    padding:10px;
    margin-top:15px;
    background: rgb(155, 238, 155);
    outline:none;
    border:none;
    cursor:pointer
}

.error {
    color:red;
}

@media screen and (max-width: 720px) {
    .card  {
        width: 100%;
        height: 100%;
        box-shadow: none;
    }

    form input {
        width: 100%;
    }
}
</style>