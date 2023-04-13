package net.damagewiz.damagewizweb.service.impl;

import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.*;
import net.damagewiz.damagewizweb.repository.*;
import net.damagewiz.damagewizweb.service.AdminService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final MechanicRepository mechanicRepository;
    private final CarPartRepository carPartRepository;
    private final UserRepository userRepository;

    @Override
    public Mechanic addMechanic(Mechanic mechanic) {
        if(mechanic.getLatitude() != null && mechanic.getLongitude() != null && mechanic.getName() != null
        && mechanic.getPhoneNumber() != null){
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

        if(mechanic.getName() != null && mechanic.getLatitude() != null && mechanic.getLongitude() != null
        && mechanic.getPhoneNumber() != null) {
            existingMechanic.setName(mechanic.getName());
            existingMechanic.setLatitude(mechanic.getLatitude());
            existingMechanic.setLongitude(mechanic.getLongitude());
            existingMechanic.setPhoneNumber(mechanic.getPhoneNumber());
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
        List<CarPart> allCarParts = carPartRepository.findAll();

        for(CarPart carPart: allCarParts){
            if(carPart.getMechanic().getId() == id){
                carPartRepository.deleteById(carPart.getId());
            }
        }
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
    public CarPart updateCarPart(CarPart carPart) {
        CarPart existingCarPart = carPartRepository.findById(carPart.getId()).get();
        if(carPart.getCar() != null && carPart.getPartName() != null
                && carPart.getPrice() > 0 && carPart.getLaborCost() >= 0 && carPart.getMechanic() != null){
            existingCarPart.setMechanic(carPart.getMechanic());
            existingCarPart.setCar(carPart.getCar());
            existingCarPart.setPartName(carPart.getPartName());
            existingCarPart.setPhoto(carPart.getPhoto());
            existingCarPart.setLaborCost(carPart.getLaborCost());
            existingCarPart.setPrice(carPart.getPrice());
            carPartRepository.save(existingCarPart);
            return existingCarPart;
        }
        else{
            return null;
        }
    }

    @Override
    public String deleteCarPart(Long id) {
        CarPart deletedCarPart = carPartRepository.findById(id).get();
        carPartRepository.deleteById(id);
        return deletedCarPart.getPartName().getName() + " of " + deletedCarPart.getCar().getBrand()
                + " " + deletedCarPart.getCar().getModel()+ " is deleted successfully!";
    }


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
