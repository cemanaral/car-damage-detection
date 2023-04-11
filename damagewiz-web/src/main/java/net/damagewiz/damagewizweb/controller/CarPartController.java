package net.damagewiz.damagewizweb.controller;

import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.Car;
import net.damagewiz.damagewizweb.entity.CarPart;
import net.damagewiz.damagewizweb.service.CarPartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
}
