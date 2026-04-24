package projeto.projetoapi.models;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.Data;
import projeto.projetoapi.entity.Catalogo;

@Data
@Entity
@JsonPropertyOrder({"id", "titulo", "estoque", "catalogo"})
public class Livraria {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String titulo;
    private String estoque;

    @Enumerated(EnumType.STRING)
    private Catalogo catalogo;

}
