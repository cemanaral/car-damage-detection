package net.damagewiz.damagewizweb.service;

import net.damagewiz.damagewizweb.entity.Car;
import net.damagewiz.damagewizweb.entity.CarPart;
import net.damagewiz.damagewizweb.entity.CarPartName;
import net.damagewiz.damagewizweb.entity.Mechanic;

public interface AdminService {

    Mechanic addMechanic(Mechanic mechanic);
    Mechanic updateMechanic(Mechanic mechanic);
    String deleteMechanic(Long id);

    CarPart addCarPart(CarPart carPart);
}
