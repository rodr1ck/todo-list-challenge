package com.rodrigo.springbootserver.service.impl;

import com.rodrigo.springbootserver.exception.ModelNotFoundException;
import com.rodrigo.springbootserver.model.Tarea;
import com.rodrigo.springbootserver.repository.TareaRepository;
import com.rodrigo.springbootserver.service.TareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

@Service
public class TareaServiceImpl implements TareaService {

    @Autowired
    private TareaRepository tareaRepository;

    @Autowired
    public TareaServiceImpl(TareaRepository tareaRepository) {
        this.tareaRepository = tareaRepository;
    }

    @Override
    public List<Tarea> findAll() {
        return tareaRepository.findAll();
    }

    @Override
    public Tarea findById(Integer id) {
        Optional<Tarea> op = tareaRepository.findById(id);
        if(op.isPresent()){
            return op.get();
        }else{
            throw new ModelNotFoundException("Tarea no encontrada");
        }
    }

    @Override
    public Tarea save(Tarea tarea) {
        return tareaRepository.save(tarea);
    }

    @Override
    public Tarea update(Tarea tarea) {
        return save(tarea);
    }

    @Override
    public boolean delete(Integer id) {
        tareaRepository.deleteById(id);
        return true;
    }
}
