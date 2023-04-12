package net.damagewiz.damagewizweb.service.impl;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.Mechanic;
import net.damagewiz.damagewizweb.repository.MechanicRepository;
import net.damagewiz.damagewizweb.service.MechanicService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MechanicServiceImpl implements MechanicService {

    private final MechanicRepository mechanicRepository;


    @Override
    public List<Mechanic> getAllMechanics() {
        List<Mechanic> mechanics = mechanicRepository.findAll();
        return mechanics;
    }
}
