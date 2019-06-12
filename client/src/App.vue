<template>
  <div id="app">
    <div id="logo_frame"><img src="./assets/logo.png"></div>
    <div id="content">
      <div id="sidebar">
        <ul>
        <li v-if="!auth"><router-link to="/login">Login</router-link></li>
        <li v-if="!auth"><router-link to="/register">Register</router-link></li>
        <li v-if="auth"><router-link to="/devices">Devices</router-link></li>
        <li v-if="auth"><router-link to="/locations">Locations</router-link></li>
        <li v-if="auth"><router-link to="/settings">Settings</router-link></li>
        <li v-if="auth"><button class="logout" @click="onLogout">Logout</button></li>
        </ul>
      </div>

      <div id="main">
        <div class="alert-danger error" v-show="error">{{ error }}</div>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  methods: {
    onLogout(){
      this.$store.dispatch('logout')
      this.$router.replace('/login')
    },
    //...mapActions(['setToken']),
    //...mapGetters(['getToken']),
    register(){
      this.$store.dispatch('register', { username: this.username, password: this.password })
    }
  },
  computed: {
    auth(){
      return this.$store.getters.isAuthenticated
    },
    error(){ return this.$store.getters.error } 
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

button {
  margin-bottom: 2px;
}

#main{
  text-align:left;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


      .wrapper {

      }

      #footer {
        border:1pt green solid;
      }

      #sidebar {
        padding-top: 77px;
        background: #eaedeb;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 18%;
      }

      #sidebar a{
        display: block;
        border: 0pt black solid;
        padding: 1em;
        background: #fff;
        margin: 1px;
      }

      #sidebar a.router-link-active{
        background: #598c6d;
        color: white;
        font-weight: bold;
      }

      .btn-success{
        font-weight: bold;
      }



      #sidebar a:hover{
        background: #598c6d;
        color: white;
        font-weight: bold;
        text-decoration: none;
      }

      #content {
        margin-left: 18%;
      }

      #footer {
        background: grey;
      }

      div {
      }

      #register_btn{
        float:right;
      }

      h2{ }

      #main{
        padding: 2%;
      }

      #logo_frame {
        background: #000;

      }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 0.2s;
  }

  .fade-leave-active {
    transition: opacity 0.2s;
    opacity: 0;
  }

  .logout {
    background-color: transparent;
    border: none;
    font: inherit;
    color: white;
    cursor: pointer;
  }

  .error {
    padding: 6px;
  }

</style>
