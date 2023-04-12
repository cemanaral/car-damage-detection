package net.damagewiz.damagewizweb.repository;

import net.damagewiz.damagewizweb.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Long> {
}
