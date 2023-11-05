package im.sta.places.jwt.services;

import im.sta.places.exceptions.BadRequestException;
import im.sta.places.jwt.models.UserPrincipal;
import im.sta.places.user.entity.UserEntity;
import im.sta.places.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
@AllArgsConstructor
public class ApplicationUserDetailsService implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new UserPrincipal(userService.searchByEmail(username));
    }

    private Boolean verifyPasswordHash(String password, byte[] storedHash, byte[] storedSalt)
    throws NoSuchAlgorithmException {

        if (password.isBlank() || password.isEmpty()) throw new IllegalArgumentException("Wrong password");

        if (storedHash.length != 64) throw new IllegalArgumentException("Invalid length of password hash");

        if (storedSalt.length != 128) throw new IllegalArgumentException("Invalid salt length");

        var md = MessageDigest.getInstance("SHA-512");
        md.update(storedSalt);

        var computedHash = md.digest(password.getBytes(StandardCharsets.UTF_8));

        for (int i = 0; i < computedHash.length; i++) {
            if (computedHash[i] != storedHash[i]) return false;
        }

        return MessageDigest.isEqual(computedHash, storedHash);
    }

    public UserEntity authenticate(String email, String password) throws NoSuchAlgorithmException {

        if (email.isEmpty() || password.isBlank()) throw new BadRequestException("Unauthorized");

        var userEntity = userService.searchByEmail(email);

        if (userEntity == null) throw new BadCredentialsException("Unauthorized");

        var verified = verifyPasswordHash(password, userEntity.getStoredHash(), userEntity.getStoredSalt());

        if (!verified) throw new BadRequestException("Unauthorized");

        return userEntity;
    }
}
