package net.damagewiz.damagewizweb.service;

import net.damagewiz.damagewizweb.entity.Car;

import java.util.List;

public interface CarService {

    List<Car> getAllCars();
    Car getCar(Long id);
}
