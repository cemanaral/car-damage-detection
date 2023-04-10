package net.damagewiz.damagewizweb.service;

import net.damagewiz.damagewizweb.entity.AuthenticationRequest;
import net.damagewiz.damagewizweb.entity.AuthenticationResponse;
import net.damagewiz.damagewizweb.entity.RegisterRequest;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse authenticate(AuthenticationRequest request);
}
