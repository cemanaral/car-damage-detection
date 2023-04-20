package net.damagewiz.damagewizweb.controller;

import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.User;
import net.damagewiz.damagewizweb.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    @GetMapping("/{username}")
    public ResponseEntity<User> getUserInformation(@PathVariable String username){
        return ResponseEntity.ok(userService.getUserInformation(username));
    }
}
