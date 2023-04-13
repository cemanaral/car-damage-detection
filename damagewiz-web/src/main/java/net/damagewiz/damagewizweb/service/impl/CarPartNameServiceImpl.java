package net.damagewiz.damagewizweb.service.impl;

import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.CarPartName;
import net.damagewiz.damagewizweb.repository.CarPartNameRepository;
import net.damagewiz.damagewizweb.service.CarPartNameService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CarPartNameServiceImpl implements CarPartNameService {

    private final CarPartNameRepository carPartNameRepository;
    @Override
    public List<CarPartName> getAllCarParts() {
        return carPartNameRepository.findAll();
    }

    @Override
    public List<CarPartName> getCarPartsById(List<Long> ids) {
        List<CarPartName> result = new ArrayList<>();
        for(Long id: ids){
            result.add(carPartNameRepository.findById(id).get());
        }
        return result;
    }
}
