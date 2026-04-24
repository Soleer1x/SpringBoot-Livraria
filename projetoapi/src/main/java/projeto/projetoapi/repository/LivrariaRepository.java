package projeto.projetoapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projeto.projetoapi.models.Livraria;

public interface LivrariaRepository extends JpaRepository<Livraria, String> {
}
