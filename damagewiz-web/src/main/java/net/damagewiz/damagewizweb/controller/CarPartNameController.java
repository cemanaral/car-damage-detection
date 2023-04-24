package net.damagewiz.damagewizweb.controller;

import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.CarPartName;
import net.damagewiz.damagewizweb.service.CarPartNameService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/car_part_names")
@CrossOrigin()
public class CarPartNameController {

    private final CarPartNameService carPartNameService;
    @GetMapping()
    public ResponseEntity<List<CarPartName>> getAllCarPartNames(){
        return ResponseEntity.ok(carPartNameService.getAllCarParts());
    }

    @GetMapping("/with_ids")
    public ResponseEntity<List<CarPartName>> getCarPartNamesById(@RequestParam List<Long> ids){
        return ResponseEntity.ok(carPartNameService.getCarPartsById(ids));
    }
}
