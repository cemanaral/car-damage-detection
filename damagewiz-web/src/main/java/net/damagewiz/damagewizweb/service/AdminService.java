package net.damagewiz.damagewizweb.service;
import net.damagewiz.damagewizweb.entity.*;
import java.util.List;

public interface AdminService {

    Mechanic addMechanic(Mechanic mechanic);
    Mechanic updateMechanic(Mechanic mechanic);
    String deleteMechanic(Long id);

    CarPart addCarPart(CarPart carPart);
    CarPart updateCarPart(CarPart carPart);
    String deleteCarPart(Long id);
    List<User> getAllUsers();
}
