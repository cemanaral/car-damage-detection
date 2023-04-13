package net.damagewiz.damagewizweb.service;

import net.damagewiz.damagewizweb.entity.CarPartName;

import java.util.List;

public interface CarPartNameService {

    List<CarPartName> getAllCarParts();
    List<CarPartName> getCarPartsById(List<Long> ids);
}
