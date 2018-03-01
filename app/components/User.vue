<template>
  <div>

    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Datos del Usuario</h1>
        <router-link :to="{ name: 'Home' }" class="btn btn-primary float-right mt-2">
          Regresar a Inicio
        </router-link>
      </div>
    </div><br />


  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <p>
          Nombre: <strong>{{ userStored.nombre }}</strong>

            </p>
          <p>
            Correo Electronico: <strong>{{ userStored.correo }}</strong>
          </p>
          
          </div>
        </div>
      </div>
    </div>
  </div>


   
  </div>
</template>

<script>
export default {
  data(){
    return{
      userStored: null
    }
  },

created: function() {
    
    this.userStored = JSON.parse(localStorage.getItem('identity'))
    console.log(this.userStored.nombre);
    
  },
  methods: {

  }
}
</script>
