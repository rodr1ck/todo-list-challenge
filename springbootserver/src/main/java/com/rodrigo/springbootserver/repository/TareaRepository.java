package com.rodrigo.springbootserver.repository;

import com.rodrigo.springbootserver.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TareaRepository extends JpaRepository<Tarea, Integer> {
}
