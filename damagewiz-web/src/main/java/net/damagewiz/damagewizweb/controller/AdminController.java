package net.damagewiz.damagewizweb.controller;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.*;
import net.damagewiz.damagewizweb.service.AdminService;
import net.damagewiz.damagewizweb.service.MechanicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController{

    private final AdminService adminService;


    @PostMapping("/add_mechanic")
    public ResponseEntity<Mechanic> addMechanic (@RequestBody Mechanic mechanic){
        return ResponseEntity.ok(adminService.addMechanic(mechanic));
    }
    @PutMapping("/edit_mechanic")
    public ResponseEntity<Mechanic> updateMechanic(@RequestBody Mechanic mechanic){
        return ResponseEntity.ok(adminService.updateMechanic(mechanic));
    }
    @DeleteMapping("/delete_mechanic/{id}")
    public ResponseEntity<String> deleteMechanic(@PathVariable("id") Long id){
        return ResponseEntity.ok(adminService.deleteMechanic(id));
    }

    @PostMapping("/add_carpart")
    public ResponseEntity<CarPart> addCarPart(@RequestBody CarPart carPart){
        return ResponseEntity.ok(adminService.addCarPart(carPart));
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(adminService.getAllUsers());
    }

}
