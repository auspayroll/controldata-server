<template>
	<div>
        <div>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" v-model="username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <button class="btn btn-primary" @click="register">Register</button>        
        </div>
   </div>

</template>

<script>
  const register_url = 'http://localhost:3000/register'
  export default{
    data: function(){
      return {
        show_options: false,
        username: '',
        password: ''
      } 
    }, 
    methods: {
      register(){
        this.$store.dispatch('register', { username: this.username, password: this.password, register_url })
      }
    }
  }
</script>

<style>
</style>