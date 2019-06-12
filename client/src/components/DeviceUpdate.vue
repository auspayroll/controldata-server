<template>
  <div>
        <form>
        <h2>TTFM100 Flow Meter</h2>

        <div class="form-group">
          <label for="serialno">Serial Number</label>
          <input type="text" class="form-control" id="serialno" aria-describedby="serialhelp">
          <small id="serialhelp" class="form-text text-muted"></small>
        </div>

        <div class="form-group">
          <label for="model">Location (optional)</label>
          <select class="form-control" id="model">
            <option>Sector 7G</option>
          </select>
        </div>
        -OR-
        <h5>Add a new location</h5>

        <div class="form-group">
          <input type="text" class="form-control" id="serialno" aria-describedby="serialhelp" placeholder="location name">
        </div>

        <button type="submit" class="btn btn-primary" @click="register">Update</button>

      </form>
    </div>


</template>


<script>
  export default{
    methods: {
      register(){
        this.$router.push('/devices')
      }
    }

  }



</script>



<style scoped>
  h2 {
    float: none;
  }



</style>