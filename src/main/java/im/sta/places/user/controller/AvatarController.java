package im.sta.places.user.controller;

import im.sta.places.user.data.AvatarResponse;
import im.sta.places.user.entity.UserEntity;
import im.sta.places.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@AllArgsConstructor
//@RequestMapping("/test/api/user/avatar")
public class AvatarController {

    private final UserService userService;

    @PostMapping("/test/api/user/{id}/avatar")
    @ResponseStatus(HttpStatus.CREATED)
    public void postAvatar(@PathVariable("id") UUID id, @RequestParam("file")MultipartFile file)
    throws Exception {

        userService.saveAvatar(id, file);

        //TODO: find or throw

    }
}
