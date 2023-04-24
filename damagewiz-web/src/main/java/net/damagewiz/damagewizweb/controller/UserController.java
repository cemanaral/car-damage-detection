package net.damagewiz.damagewizweb.controller;

import lombok.RequiredArgsConstructor;
import net.damagewiz.damagewizweb.entity.User;
import net.damagewiz.damagewizweb.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin()
public class UserController {

    private final UserService userService;
    @GetMapping("/{username}")
    public ResponseEntity<User> getUserInformation(@PathVariable String username){
        return ResponseEntity.ok(userService.getUserInformation(username));
    }
}
