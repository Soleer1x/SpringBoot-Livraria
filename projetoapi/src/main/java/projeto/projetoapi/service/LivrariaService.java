package projeto.projetoapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projeto.projetoapi.models.Livraria;
import projeto.projetoapi.repository.LivrariaRepository;

import java.util.List;

@Service
public class LivrariaService {

    @Autowired
    private LivrariaRepository livrariaRepository;

    public List<Livraria> findAll(){
        return livrariaRepository.findAll();
    }

    public Livraria findById(String id){
        return livrariaRepository.findById(id).orElse(null);
    }

    public Livraria create(Livraria livraria){
        return livrariaRepository.save(livraria);
    }

    public Livraria updateById(String id, Livraria livraria){
        if(livrariaRepository.existsById(id)){
            livraria.setId(id);
            return livrariaRepository.save(livraria);
        } else {
            return null;
        }
    }

    public void deleteById(String id){
        livrariaRepository.deleteById(id);
    }
}
