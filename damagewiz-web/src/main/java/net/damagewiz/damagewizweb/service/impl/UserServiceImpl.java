package net.damagewiz.damagewizweb.service.impl;

import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.User;
import net.damagewiz.damagewizweb.repository.UserRepository;
import net.damagewiz.damagewizweb.service.UserService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    @Override
    public User getUserInformation(String username) {

        return userRepository.findByEmail(username).get();
    }
}
