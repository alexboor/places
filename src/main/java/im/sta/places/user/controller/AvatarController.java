package im.sta.places.user.controller;

import im.sta.places.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.awt.*;
import java.util.UUID;

@RestController
@AllArgsConstructor
//@RequestMapping("/test/api/user/avatar")
public class AvatarController {

    private final UserService userService;

    @PostMapping("/api/v1/users/{id}/avatar/")
    public String postAvatar(@PathVariable("id") UUID id, @RequestParam("avatar")MultipartFile file, RedirectAttributes redirectAttributes) throws Exception {
        userService.saveAvatar(id, file);

        redirectAttributes.addFlashAttribute("message", "Successfully uploaded" + file.getOriginalFilename() + " !");

        return "redirect:/";
    }

    @GetMapping(
            value = "/content/avatar/{id}/",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public @ResponseBody byte[] getAvatar(@PathVariable("id") UUID id) throws Exception {
        return userService.getAvatar(id);
    }
}
