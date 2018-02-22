<template>
  <div>
    <h1>Crear Publicacion</h1>
    <form v-on:submit.prevent="addItem">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Item Name:</label>
            <input type="text" class="form-control" v-model="item.name">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Item Price:</label>
            <input type="text" class="form-control col-md-6" v-model="item.price">
          </div>
        </div>
      </div><br />
      <div class="form-group">
        <button class="btn btn-primary">Add Item</button>
      </div>
    </form>
  </div>
</template>

<script>
  import toastr from 'toastr';

  export default {
    data(){
      return{
        item:{}
      }
    },
    methods: {
      addItem(){
        let uri = 'http://localhost:3000/api/register';
        this.axios.post(uri, this.item).then((res) => {
          console.log(res);
          toastr.success(res.data.item, 'Response');
          this.$router.replace({ name: 'DisplayItem'})
        });
      }
    }
  }
  </script>
