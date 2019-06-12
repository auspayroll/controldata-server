<template>
	<div>
	    <h2>Locations</h2>
	    <router-link to="/locations/update" tag="button" class="btn btn-success" type="button" id="register_btn">Add a Location</router-link>
	   <table class="table table-striped table-hover">
	     <thead>
	     <tr><th>Location</th><th>lat./long.</th></th><th># devices</th></tr>
	    </thead>
	     <tr v-for="q in 3"><td><router-link to="/locations/update">Sector 7G</router-link></td>
	     <td><router-link to="/locations/update">134.343/98.434</router-link></td><td><router-link to="/devices">3</router-link></td></tr>

	   </table>
   </div>

</template>


<script>



</script>



<style>



</style>