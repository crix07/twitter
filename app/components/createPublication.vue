<template>
  <div>
    <h1>Crear Publicacion</h1>
    <form v-on:submit.prevent="publication">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>:</label>
            <input type="text" class="form-control col-md-6" v-model="item.publication">
          </div>
        </div>
      </div><br />
      <div class="form-group">
        <button class="btn btn-primary">Publicar</button>
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
      publication(){
        let uri = 'http://localhost:3000/api/register';
        this.axios.post(uri, this.item)
         .then((res) => {
          console.log(res);
          toastr.success(res.data.item, 'Response');
          this.$router.replace({ name: 'DisplayItem'})
        })
         .catch(err => {
            console.log(err)
          })
      }
    }
  }
  </script>
