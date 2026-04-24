package projeto.projetoapi.controller;

import lombok.Data;
import org.springframework.web.bind.annotation.*;
import projeto.projetoapi.models.Livraria;
import projeto.projetoapi.service.LivrariaService;

import java.util.List;

@Data
@RestController
@RequestMapping("livraria")
public class LivrariaController {

    private final LivrariaService livrariaService;

    @GetMapping
    public List<Livraria> findAll(){
        return livrariaService.findAll();
    }

    @GetMapping("{id}")
    public Livraria findById(@PathVariable String id){
        return livrariaService.findById(id);
    }

    @PostMapping
    public Livraria create(@RequestBody Livraria livraria){
        return livrariaService.create(livraria);
    }

    @PutMapping("{id}")
    public Livraria updateById(@PathVariable String id, @RequestBody Livraria livraria){
        return livrariaService.updateById(id, livraria);
    }

    @DeleteMapping("{id}")
    public void deletebyId(@PathVariable String id){
        livrariaService.deleteById(id);
    }
}
