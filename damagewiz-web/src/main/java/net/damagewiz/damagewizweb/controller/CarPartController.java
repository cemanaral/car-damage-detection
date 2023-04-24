package net.damagewiz.damagewizweb.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.Car;
import net.damagewiz.damagewizweb.entity.CarPart;
import net.damagewiz.damagewizweb.service.CarPartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/car_part")
@CrossOrigin()
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

    @GetMapping("/{car_id}/{part_id}")
    public ResponseEntity<List<CarPart>> getCarPartsByPythonAPI(@PathVariable Long car_id, @PathVariable Long part_id){
        return ResponseEntity.ok(carPartService.getCarPartsFromPythonAPI(car_id,part_id));
    }
}
