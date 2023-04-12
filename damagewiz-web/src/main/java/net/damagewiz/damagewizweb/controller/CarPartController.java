package net.damagewiz.damagewizweb.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.Car;
import net.damagewiz.damagewizweb.entity.CarPart;
import net.damagewiz.damagewizweb.service.CarPartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/carpart")
public class CarPartController {

    private final CarPartService carPartService;

    @GetMapping()
    public ResponseEntity<List<CarPart>> getAllCarParts(){
        return ResponseEntity.ok(carPartService.getAllCarParts());
    }

    @GetMapping("/{mechanic_id}")
    public ResponseEntity<List<CarPart>> getCarPartsByMechanicId(@PathVariable Long mechanic_id){
        return ResponseEntity.ok(carPartService.getCarPartsByMechanicId(mechanic_id));
    }
}
