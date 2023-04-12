package net.damagewiz.damagewizweb.service;

import net.damagewiz.damagewizweb.entity.Car;
import net.damagewiz.damagewizweb.entity.CarPart;
import net.damagewiz.damagewizweb.entity.Mechanic;

import java.util.List;

public interface CarPartService {

    List<CarPart> getAllCarParts();
    List<CarPart> getCarPartsByMechanicId(Long id);
    List<CarPart> getCarPartsFromPythonAPI(Long carId, Long partId);

}
