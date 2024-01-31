import {useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {
  //Objeto produto
  const produto = {
    codigo: 0,
    nome: '',
    marca: ''
  }

  //useState
  const [btnCadastrar, setBtnCadastrar]= useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjproduto] = useState(produto);

  //useEffect
  useEffect(() =>{
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  }, [] );

  //obtendo os dados do formulário
  const aoDigitar = (e) => {
    setObjproduto({...objProduto, [e.target.name]:e.target.value});
  }

  //cadastrar produto
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
        method:'post',
        body: JSON.stringify(objProduto),
        headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
        }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
        if(retorno_convertido.mensagem !== undefined){
          alert(retorno_convertido.mensagem);
        }else{
          setProdutos([...produtos, retorno_convertido]);
          alert('Produto cadastrado com sucesso!')
          limparFormulario();
        }
    })
  }

  //Alterar produto
    const alterar = () => {
      fetch('http://localhost:8080/alterar', {
          method:'put',
          body: JSON.stringify(objProduto),
          headers:{
              'Content-type':'application/json',
              'Accept':'application/json'
          }
      })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {

          if(retorno_convertido.mensagem !== undefined){
            alert(retorno_convertido.mensagem);
          }else{
            //mensagem
            alert('Produto alterado com sucesso!')

            //cópia do vetor de produtos
            let vetorTemp = [...produtos];

            //indice
            let indice = vetorTemp.findIndex((p) => {
                return p.codigo === objProduto.codigo;
            });

            //alterar produto do vetor temp
            vetorTemp[indice] = objProduto;

            //Atualizar o vetor de produtos
            setProdutos(vetorTemp);

            //limpa formulario
            limparFormulario();
          }
      })
    }

  //Remover produto
    const remover = () => {
      fetch('http://localhost:8080/remover/' + objProduto.codigo, {
          method:'delete',
          headers:{
              'Content-type':'application/json',
              'Accept':'application/json'
          }
      })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        //Mensagem
        alert(retorno_convertido.mensagem);

        //cópia do vetor de produtos
        let vetorTemp = [...produtos];

        //indice
        let indice = vetorTemp.findIndex((p) => {
            return p.codigo === objProduto.codigo;
        });

        //remover produto do vetor temp
        vetorTemp.splice(indice, 1);

        //Atualizar o vetor de produtos
        setProdutos(vetorTemp);

        //Limpar formulário
        limparFormulario();
      })
    }


  //Limpar formulário
  const limparFormulario = () => {
    setObjproduto(produto);
    setBtnCadastrar(true);
  }

  //selecionar produto
  const selecionarProduto = (indice) => {
    setObjproduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparFormulario} remover={remover} alterar={alterar}/>
      <Tabela vetor={produtos} selecionar={selecionarProduto}/>
    </div>
  );
}

export default App;
