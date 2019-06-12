<template>
  <div>
        <form>
        <h2>Location</h2>

        <div class="form-group">
          <label for="serialno">Location Name</label>
          <input type="text" class="form-control" id="serialno" aria-describedby="serialhelp">
          <small id="serialhelp" class="form-text text-muted"></small>
        </div>

        <div class="form-group">
          <label for="serialno">Co-ordinates</label>
          <input class="form-control coord" id="lat" aria-describedby="serialhelp" placeholder="latitude" v-model="latitude"> <input class="form-control coord" id="lat" aria-describedby="serialhelp" placeholder="longitude" v-model="longitude"> <button class="btn btn-primary" @click="getLocation">Use current location</button>
          <small id="serialhelp" class="form-text text-muted"></small>
        </div>

        <button type="button" class="btn btn-primary" @click="register">Update</button>

      </form>
    </div>


</template>


<script>
  export default{
    data: function(){
      return {
        latitude: null,
        longitude: null
      }
    },
    methods: {
      register(){
        this.$router.push('/locations')
      }, 
      getLocation(){
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition);
          } else { 
            console.log('error')
          }
      }, 
      setPosition(position){
        console.log('here');
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      }
    }

  }



</script>



<style scoped>
  .coord{
    width: auto;
    display: inline;
  }
  h2 {
    float: none;
  }



</style>