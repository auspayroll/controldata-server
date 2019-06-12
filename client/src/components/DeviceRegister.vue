<template>
  <div>
        <form>
        <h2>Register your Device</h2>
        <div>
          <div class="form-group">
            <label for="model">Device Model</label>
            <select class="form-control" id="model" v-model="model">
              <option v-for="dm in deviceModels" :value="dm._id">{{ dm.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="serialno">Serial Number</label>
            <input type="text" class="form-control" id="serial" v-model="serial" aria-describedby="serialhelp">
            <small id="serialhelp" class="form-text text-muted"></small>
          </div>
          <div class="form-group">
            <label for="serialno">Description</label>
            <input type="text" class="form-control" id="description" v-model="description">
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
            <input type="text" class="form-control" id="serial" aria-describedby="serialhelp" placeholder="location name">
          </div>

          <button type="button" class="btn btn-primary" @click="show_options = !show_options">Serial port options</button>
          <transition name="fade">
          <div id="port_panel" v-show="show_options">
          <div class="form-group">
            <label for="model">Baud Rate</label>
            <select class="form-control" id="model">
              <option>9600</option>
            </select>
          </div>
          <div class="form-group">
            <label for="model">Data bits</label>
            <select class="form-control" id="model">
              <option>8</option>
            </select>
          </div>
          <div class="form-group">
            <label for="model">Parity</label>
            <select class="form-control" id="model">
              <option>None</option>
              <option>Odd</option>
              <option>Even</option>
            </select>
          </div>
          <div class="form-group">
            <label for="model">Stop bits</label>
            <select class="form-control" id="model">
              <option>1</option>
            </select>
          </div>
          <div class="form-group">
            <label for="model">Flow Control</label>
            <select class="form-control" id="model">
              <option>None</option>
            </select>
          </div>
          </div>
          </transition>

          <button type="submit" class="btn btn-primary" @click="register">Register</button>
        </div>
      </form>
    </div>


</template>

<script>
  export default{
    data: function(){
      return {
        model: "",
        serial: "",
        description: "",
        show_options: false
      } 
    }, 
    created(){
      this.$store.dispatch('setDeviceModels')
    },
    computed: {
      deviceModels(){
		  	return this.$store.getters.deviceModels
      }
    },
    methods: {
      register(){
        this.$store.dispatch("registerDevice", { model: this.model, serial: this.serial, description: this.description })
      }
    }

  }

</script>


<style scoped>
  h2 {
    float: none;
  }

  #port_panel{
    background: #f7f9f7;
    padding: 8px;
    border-radius: 5px;
    margin-bottom: 5px;
  }


</style>