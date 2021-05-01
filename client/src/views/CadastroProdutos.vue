<template>
  <div class="container" id="telaCadPess">
    <div class="row">
      <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="card">
          <div class="card-header">
            <b>Produtos</b>
            <router-link to="/produtosLista"> <img style="margin-left: 10px;" src="../assets/lupa.png" width="20px;"></router-link>
          </div>
          <div class="card-body">
            <div class="form-group">
              <input type="hidden"  v-model="idprodutos" class="form-control" id="idprodutos">
              <input type="hidden" v-model="prod_idpessoas" class="form-control" id="prod_idpessoas">
              <div class="row">
                <div class="col-sm-8 col-xs-8">
                  <input type="text" v-model="prod_nome" class="form-control" id="nome" placeholder="Produto">
                </div>
                <div class="col-sm-4 col-xs-4">
                  <input type="number" v-model="prod_preco" class="form-control" id="nome" placeholder="Preço">
                </div>
              </div>
              <div class="row" style="margin-top: 10px;">
                <div class="col-sm-12 col-xs-12">
                  <textarea class="form-control" aria-label="With textarea" v-model="prod_descricao"  placeholder="Descrição do produto"></textarea>
                </div>
              </div>
              <div class="row" style="margin-top: 10px;">
                <div class="col-sm-6 col-xs-12">
                  <input class="form-control-file" type="file" @change="onFileSelected">
                </div>
                <div class="col-sm-6 col-xs-12" v-if="prod_foto">
                  <img class="img-thumbnail" v-bind:src="'http://localhost:3333/files/' + prod_foto" alt="" width="300px">
                </div>
              </div>
              <center>
                <br>
                <button class="btn btn-success" v-if="idprodutos == undefined || idprodutos == ''" v-on:click="criaProduto()">Criar</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button class="btn btn-success" v-if="prod_idpessoas == this.$session.get('idpessoas')" v-on:click="alterarProduto()">Salvar</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button class="btn btn-danger" v-if="idprodutos > 0 && prod_idpessoas == this.$session.get('idpessoas')" v-on:click="excluirProduto()">Excluir</button>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import $ from 'jquery'

export default {
  name: 'AppCadastroProdutos',
   data() {
    return {
      idprodutos: '',
      prod_nome: '',
      prod_preco: '',
      prod_descricao: '',
      prod_foto: '',  
      prod_idpessoas: '',
      selectFile: null
    }

  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  },
  watch:{
    $route (to, from){
      //
      if(from.name != "cadProd" && from.name != "buscaProd" && from.name != "listaProd"){
        this.$router.push('/inicio')
      }else{
        // console.log(to)
        if(to.params.idprodutos > 0 ){
          this.buscaProdutos(to.params.idprodutos)
        }
      }
    }
  },
  mounted: function(){
    if(this.idprodutos == '' && this.$router.currentRoute.params.idprodutos > 0){
      this.buscaProdutos(this.$router.currentRoute.params.idprodutos)
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectFile = event.target.files[0]
    },
    alterarProduto(){
      //
      $("#prod_nome").css("border-color", "#ced4da")
      var self = this
      //
      const axios = require('axios');
      //
      if(self.prod_nome == '' || self.prod_nome == undefined){
        this.$swal("Informe o nome do produto!")
        $("#prod_nome").css("border-color", "red")
        $("#prod_nome").focus()
      }
      //
      var newNameFoto = '';
      // console.log(this.selectFile)
      const fd = new FormData();
      fd.append('file', this.selectFile, this.selectFile.name)
      axios.post('http://localhost:3333/upload', fd)
      .then(function (response) {
        // console.log(response)
        console.log(response.data.newName)
        newNameFoto = response.data.newName;
        if(newNameFoto == '' || newNameFoto == undefined){
          newNameFoto = self.prod_foto
        }
        self.prod_foto = newNameFoto
        axios.put('http://localhost:3333/produtos/' + self.idprodutos, {
          prod_nome: self.prod_nome,
          prod_preco: self.prod_preco,
          prod_descricao: self.prod_descricao,
          prod_foto: newNameFoto,
          prod_idpessoas: self.$session.get('idpessoas')
        })
        .then(function (response) {
          if(response.status == 200){
            self.$swal("Produto atualizado com sucesso!")
          }else{
            self.$swal("Produto não pode ser atualizado!")
          }
          
        }).catch(function (error) {
          self.$swal(error.response.data.msg);
        })
        .then(function () {
          // always executed
        });  
      })
      //
      
    },
    excluirProduto(){
      var self = this
      //
      const axios = require('axios');
      //
      axios.delete('http://localhost:3333/produtos/' + self.idprodutos)
      .then(function (response) {
        if(response.status == 200){
          self.$swal("Produto excluido com sucesso!")
          self.idprodutos = ''
          self.prod_nome = ''
          self.prod_preco = ''
          self.prod_descricao = ''
          self.prod_foto = ''
          self.prod_idpessoas = ''
          self.$router.push("/produtos")
        }else{
          self.$swal("Produto não pode ser excluido!")
        }
        
      }).catch(function (error) {
        self.$swal(error.response.data.msg);
      })
      .then(function () {
        // always executed
      });  
    },
    criaProduto(){
      $("#prod_nome").css("border-color", "#ced4da")
      var self = this
      //
        const axios = require('axios');
      //
      if(self.prod_nome == '' || self.prod_nome == undefined){
        this.$swal("Informe o nome do produto!")
        $("#prod_nome").css("border-color", "red")
        $("#prod_nome").focus()
      }
      //
      var newNameFoto = '';
      const fd = new FormData();
      fd.append('file', this.selectFile, this.selectFile.name)
      axios.post('http://localhost:3333/upload', fd)
      .then(function (response) {
        //console.log(response)
        newNameFoto = response.data.newName;
        self.prod_foto = newNameFoto
        axios.post('http://localhost:3333/produtos', {
          prod_nome: self.prod_nome,
          prod_preco: self.prod_preco,
          prod_descricao: self.prod_descricao,
          prod_foto: newNameFoto,
          prod_idpessoas: self.$session.get('idpessoas')
        })
        .then(function (response) {
          if(response.status == 200){
            // console.log(response.data.idprodutos)
            self.$router.push("/produtos/" + response.data.idprodutos)
          }else{
            self.$swal("Produto não cadastrado!")
          }
          
        }).catch(function (error) {
          self.$swal(error.response.data.msg);
        })
        .then(function () {
          // always executed
        });
      })
      //
      //
    },
    buscaProdutos(idprodutos){
      var self = this;

      const axios = require('axios');
      axios.get('http://localhost:3333/produtos/' + idprodutos)
      .then(function (response) {
        // console.log(response.data.idprodutos)
        //
        if(response.data.idprodutos <= 0 || response.data.idprodutos == undefined || response.data.idprodutos == ''){
          self.$router.push("/produtos")
        }
        //
        self.idprodutos = response.data.idprodutos
        self.prod_nome = response.data.prod_nome
        self.prod_preco = response.data.prod_preco
        self.prod_descricao = response.data.prod_descricao
        self.prod_foto = response.data.prod_foto
        self.prod_idpessoas = response.data.prod_idpessoas
        //
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
  #telaCadPess{
    padding-top: 10px;
  }
  input[type=number]::-webkit-inner-spin-button {      
    -webkit-appearance: none;      
  } 
  input[type=number] {     
    -moz-appearance: textfield;    
    appearance: textfield;  
  }
</style>
