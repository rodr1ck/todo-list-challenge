package com.rodrigo.springbootserver.controller;

import com.rodrigo.springbootserver.model.Tarea;
import com.rodrigo.springbootserver.service.TareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/tarea")
public class TareaController {
    @Autowired
    private TareaService tareaService;

    @GetMapping
    @CrossOrigin
    public List<Tarea> findAll(){
        return tareaService.findAll();
    }

    @GetMapping("/{id}")
    @CrossOrigin
    public Tarea findById(@PathVariable("id") Integer id){
        return tareaService.findById(id);
    }

    @PostMapping
    @CrossOrigin
    public @ResponseBody Tarea save(@RequestBody Tarea tarea){
        return tareaService.save(tarea);
    }

    @PutMapping
    public ResponseEntity<Tarea> modificar(@Valid @RequestBody Tarea tarea) {
        Tarea obj = tareaService.update(tarea);
        return new ResponseEntity<Tarea>(obj, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> eliminar(@PathVariable("id") Integer id) throws Exception {
        tareaService.delete(id);
        return new ResponseEntity<Object>(HttpStatus.OK);
    }

}
