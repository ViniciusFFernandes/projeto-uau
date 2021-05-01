<template>
  <div class="container" id="telaCadPess">
    <div class="row">
        <div class="col-lg-4 col-sm-2 col-xs-1"></div>
        <div class="col-lg-4 col-sm-8 col-xs-10 card">
        <div class="card-body">
            <center><img class="img-fluid img-logo" src="@/assets/logo.png" alt="Logomarca"></center>
            <div class="form-group">
            <input type="text" v-model="dados.nome" class="form-control" id="nome" placeholder="Seu nome">
            </div>
            <div class="form-group">
            <input type="email" v-model="dados.email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Seu email">
            </div>
            <div class="form-group">
            <input type="password" v-model="dados.senha" class="form-control" id="senha" placeholder="Senha">
            </div>
            <div class="form-group">
            <input type="password" v-model="dados.senha2" class="form-control" id="senha2" placeholder="Repita Senha">
            </div>
            <button class="btn btn-primary" v-on:click="criarLogin(dados)">Criar Conta</button>
            <p class="text-center font-italic text-nova-conta" ><router-link to="/">Voltar</router-link></p>
        </div>
        </div>
        <div class="col-lg-4 col-sm-2 col-xs-1"></div>
    </div>
  </div>
</template>

<script>

import $ from 'jquery'

export default {
  name: 'pessoas_cadastro',
  data() {
    return{ dados:{} }
  },
  methods: {
    criarLogin(dados){
      // console.log(dados.nome);
      //reseta as bordas
      //
      $("#nome").css("border-color", "#ced4da");
      $("#email").css("border-color", "#ced4da");
      $("#senha").css("border-color", "#ced4da");
      $("#senha2").css("border-color", "#ced4da");
      
      if(dados.nome == '' || dados.nome == undefined){
        this.$swal("Informe seu nome!");
        $("#nome").css("border-color", "red");
        $("#nome").focus();
        return;
      }
      if(dados.email == '' || dados.email == undefined){
        this.$swal("Informe seu email!");
        $("#email").css("border-color", "red");
        $("#email").focus();
        return;
      }
      if(dados.senha == '' || dados.senha == undefined){
        this.$swal("Informe sua senha!");
        $("#senha").css("border-color", "red");
        $("#senha").focus();
        return;
      }
      if(dados.senha != dados.senha2){
        this.$swal("As senhas não são iguais!");
        $("#senha").css("border-color", "red");
        $("#senha2").css("border-color", "red");
        $("#senha").focus();
        return;
      }

      var self = this

      const axios = require('axios');
      axios.post('http://localhost:3333/pessoas', {
          pess_nome: dados.nome,
          pess_email: dados.email,
          pess_senha: dados.senha
        }
      )
      .then(function (response) {
        // console.log(response.data.idpessoas)
        if(response.status == 200){
          self.$swal("Conta criado com sucesso!\nVocê será redirecionado para a area de login!");
          self.$router.push('/')
        }else{
          self.$swal("Erro ao criar o conta!");
          console.log(response)
        }
        
      }).catch(function (error) {
        self.$swal(error.response.data.msg);
        if(error.response.data.msg == 'Email já cadastrado!'){
          $("#email").css("border-color", "red");
          $("#email").focus();
        }
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

  #telaCadPess{
    padding-top: 10px;
  }
</style>
