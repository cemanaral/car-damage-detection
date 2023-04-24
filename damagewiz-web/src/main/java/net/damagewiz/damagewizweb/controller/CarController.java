package net.damagewiz.damagewizweb.controller;

import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.Car;
import net.damagewiz.damagewizweb.service.CarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/car")
@CrossOrigin()
public class CarController {

    private final CarService carService;

    @GetMapping()
    public ResponseEntity<List<Car>> getAllCars(){
        return ResponseEntity.ok(carService.getAllCars());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCar(@PathVariable Long id){
        return ResponseEntity.ok(carService.getCar(id));
    }
}
