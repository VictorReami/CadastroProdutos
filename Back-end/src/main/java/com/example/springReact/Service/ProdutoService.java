package com.example.springReact.Service;

import com.example.springReact.Entity.Produto;
import com.example.springReact.Entity.Resposta;
import com.example.springReact.Repository.ProdutoRepository;
import org.apache.coyote.Response;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository pr;

    @Autowired
    private Resposta rm;

    //método para listar todos os produtos
    public Iterable<Produto> Listar(){
        return pr.findAll();
    }

    //método para cadastrar ou alterar produtos
    public ResponseEntity<?> cadastrarAlterar(Produto pm, String acao){
        if(pm.getNome().equals("")){
            rm.setMensagem("O nome do produto é obrigatório!");
            return new ResponseEntity<Resposta>(rm, HttpStatus.BAD_REQUEST);
        }else if(pm.getMarca().equals("")){
            rm.setMensagem("O nome da marca é Obrigatório!");
            return new ResponseEntity<Resposta>(rm, HttpStatus.BAD_REQUEST);
        }else{
            if (acao.equals("cadastrar")){
                return new ResponseEntity<Produto>(pr.save(pm), HttpStatus.CREATED);
            }else{
                return new ResponseEntity<Produto>(pr.save(pm), HttpStatus.OK);
            }
        }
    }

    //Método para remover produtos
    public ResponseEntity<Resposta> remover(Long codigo){
        pr.deleteById(codigo);
        rm.setMensagem("O produto foi removido com sucesso!");

        return new ResponseEntity<Resposta>(rm, HttpStatus.OK);
    }
}
