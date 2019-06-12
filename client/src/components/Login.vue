<template>
	<div>
		<div class="form-group">
		<label for="username">Username</label>
		<input type="text" class="form-control" id="username" v-model="username">
		</div>

		<div class="form-group">
		<label for="password">Password</label>
		<input type="password" class="form-control" id="password" v-model="password">
		</div>
		<button class="btn btn-primary" @click="login">Login</button> 
   </div>

</template>

<script>
  export default{
    data: function(){
      return {
		show_options: false,
		username: '',
		password: ''
      } 
    }, 
    methods: {
      login(){
		this.$store.dispatch('login', { username: this.username, password: this.password })
      }
	}
  }
</script>

<style>
</style>