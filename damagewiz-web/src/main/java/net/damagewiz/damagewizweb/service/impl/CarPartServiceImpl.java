package net.damagewiz.damagewizweb.service.impl;

import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.Car;
import net.damagewiz.damagewizweb.entity.CarPart;
import net.damagewiz.damagewizweb.entity.Mechanic;
import net.damagewiz.damagewizweb.repository.CarPartRepository;
import net.damagewiz.damagewizweb.service.CarPartService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CarPartServiceImpl implements CarPartService {

    private final CarPartRepository carPartRepository;

    @Override
    public List<CarPart> getAllCarParts() {
        return carPartRepository.findAll();
    }
}
