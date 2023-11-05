package im.sta.places.user.controller;

import im.sta.places.user.data.UserDto;
import im.sta.places.user.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.UUID;

@AllArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @GetMapping("/api/v1/users/{id}")
    public UserDto getUserById(@PathVariable("id") UUID id) {
        return userService.findUserById(id);
    }

    @PutMapping("/api/v1/users/{id}")
    public void putUser(@PathVariable("id") UUID id, @Valid @RequestBody UserDto userDto)
    throws NoSuchAlgorithmException {
        userService.updateUser(id, userDto, userDto.getPassword());
    }

//    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/auth/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto postUser(@Valid @RequestBody UserDto userDto) throws NoSuchAlgorithmException {
        return userService.createUser(userDto, userDto.getPassword());
    }

}
