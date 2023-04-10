package net.damagewiz.damagewizweb.repository;

import net.damagewiz.damagewizweb.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    //Crud methods came automatically.

    Optional<User> findByEmail(String email);
}
