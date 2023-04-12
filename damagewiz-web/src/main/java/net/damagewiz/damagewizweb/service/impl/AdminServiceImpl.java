package net.damagewiz.damagewizweb.service.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.*;
import net.damagewiz.damagewizweb.repository.*;
import net.damagewiz.damagewizweb.service.AdminService;
import net.damagewiz.damagewizweb.service.MechanicService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final MechanicRepository mechanicRepository;
    private final CarPartRepository carPartRepository;
    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final CarPartNameRepository carPartNameRepository;

    @Override
    public Mechanic addMechanic(Mechanic mechanic) {
        if(mechanic.getLocation() != null && mechanic.getName() != null){
            mechanicRepository.save(mechanic);
            return mechanic;
        }
        else{
            return null;
        }

    }

    @Override
    public Mechanic updateMechanic(Mechanic mechanic) {
        Mechanic existingMechanic = mechanicRepository.findById(mechanic.getId()).get();

        if(mechanic.getName() != null && mechanic.getLocation() != null) {
            existingMechanic.setName(mechanic.getName());
            existingMechanic.setLocation(mechanic.getLocation());
            mechanicRepository.save(existingMechanic);
            return existingMechanic;
        }
        else{
            return null;
        }

    }

    @Override
    public String deleteMechanic(Long id) {
        Mechanic deletedMechanic = mechanicRepository.findById(id).get();
        mechanicRepository.deleteById(id);
        return deletedMechanic.getName() + "is deleted successfully";
    }



    @Override
    public CarPart addCarPart(CarPart carPart) {
        if(carPart.getPartName() != null && carPart.getPrice() > 0 && carPart.getLaborCost() > 0) {
            carPartRepository.save(carPart);
            return carPart;
        }
        else {
            return null;
        }
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
