<template>
  <div class="container" id="telaLogin">
    <form @submit.prevent="executaLogin(dados)">
      <div class="row">
          <div class="col-lg-4 col-sm-2 col-xs-1"></div>
          <div class="col-lg-4 col-sm-8 col-xs-10 card">
          <div class="card-body">
              <center><img class="img-fluid img-logo" src="@/assets/logo.png" alt="Logomarca"></center>
              <div class="form-group">
              <input type="email" v-model="dados.email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Email">
              </div>
              <div class="form-group">
              <input type="password" v-model="dados.senha" class="form-control" id="exampleInputPassword1" placeholder="Senha">
              </div>
              <button class="btn btn-primary">Logar</button>
              <p class="text-center font-italic text-nova-conta" ><router-link to="/pessoas">Criar nova conta</router-link></p>
          </div>
          </div>
          <div class="col-lg-4 col-sm-2 col-xs-1"></div>
      </div>
    </form>
  </div>
</template>

<script>

export default{
    data(){
    return { dados:{} };
  },
  beforeCreate: function () {
    if (this.$session.exists()) {
      this.$router.push('/inicio')
    }

  },
  methods: {
    executaLogin(dados){
      var self = this

      const axios = require('axios');
      axios.get('http://localhost:3333/pessoas', {
        params: {
          pess_email: dados.email,
          pess_senha: dados.senha
        }
      })
      .then(function (response) {
        // console.log(response.data.idpessoas)
        if(response.data.idpessoas > 0){
          self.$session.start()
          self.$session.set('logado', true)
          self.$session.set('idpessoas', response.data.idpessoas)
          self.$router.push('/inicio')
        }else{
          self.$swal("Usuario não encontrado!")
        }
        
      }).catch(function (error) {
        self.$swal(error.response.data.msg);
      })
      .then(function () {
        // always executed
      });  
    }
  }
}
</script>

<style scoped>
  .img-logo {
    max-width: 250px;
    margin: 0 auto;  
  }

  #telaLogin{
    padding-top: 10px;
  }

  .text-nova-conta{
    color:rgb(24, 57, 241);
    cursor: pointer;
    font-size: 15px;  
  }
</style>
