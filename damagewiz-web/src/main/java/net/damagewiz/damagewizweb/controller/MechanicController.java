package net.damagewiz.damagewizweb.controller;

import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.Mechanic;
import net.damagewiz.damagewizweb.repository.MechanicRepository;
import net.damagewiz.damagewizweb.service.MechanicService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mechanic")
public class MechanicController {

    private final MechanicService mechanicService;

    @GetMapping()
    public ResponseEntity<List<Mechanic>> getMechanics(){
        return ResponseEntity.ok(mechanicService.getAllMechanics());
    }


}
