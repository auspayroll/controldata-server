<template>
	<div>
			<button @click="connect">Connect</button>
	    <h2>Devices</h2>
	    <router-link to="/devices/register" tag="button" class="btn btn-success" type="button" id="register_btn">Register Device</router-link>
	   <table class="table table-striped table-hover">
	     <thead>
	     <tr><th>Model</th><th></th></th><th>Serial #</th><th>Manufacturer</th><th>Active?</th></tr>
	    </thead>
			
	     <tr v-for="device in devices">
				<td>{{ device.model.name }}</td>
				<td>
					<router-link to="/devices/update">Settings</router-link> | 
					<router-link to="/devices/chart">Graph</router-link></a></td></td>
				<td>{{ device.serial }}</td>
				<td>{{ device.model.manufacturer }}</td><td>No</td>
			 </tr>
	   </table>
		 <div v-for="result in results">{{ result }}</div>
   </div>

</template>

<script>
	var connection
  export default{
    data: function(){
      return {
				show_options: false,
				results: ["here"]
      } 
    }, 
    computed: {
      devices(){
		  	return this.$store.getters.devices
      }
		},
		created(){
			this.$store.dispatch('setDevices')
		},
		methods: {
			connect(){
				var port = '/dev/ttys004'
				var results = this.results
				this.$store.commit('setConnection', port)
				var connections = this.$store.getters.connections
				console.log(connections)
				if(connections[port]){
					var connection = connections[port]
					connection.onmessage = function (event) {
					 	results.push(event.data)
					}
				}
			}
		}

  }

</script>

<style>

</style>