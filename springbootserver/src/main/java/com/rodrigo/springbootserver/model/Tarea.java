package com.rodrigo.springbootserver.model;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Tarea")
public class Tarea {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer tareaId;

    @Column(name = "fecha", length = 150)
    @Size(min = 6, max = 15, message = "La fecha de la Tarea tiene un minimo de 6 y un maximo de 15 caracteres")
    @NotNull(message= "fecha: no puede ser nulo")
    private String fecha;

    @Column(name = "descripcion", length = 150)
    @Size(max = 200, message = "La descripcion de la Tarea tiene un maximo de 200 caracteres")
    private String descripcion;

    @Column(name = "responsable", length = 150)
    @Size(min = 2, max = 20, message = "El responsable de la Tarea tiene un minimo de 2 y un maximo de 20 caracteres")
    @NotNull(message= "el responsable: no puede ser nulo")
    private String responsable;

    public Integer getTareaId() {
        return tareaId;
    }

    public void setTareaId(Integer tareaId) {
        this.tareaId = tareaId;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }
}
