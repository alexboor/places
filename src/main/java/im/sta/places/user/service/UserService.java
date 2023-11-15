package im.sta.places.user.service;

import im.sta.places.exceptions.BadRequestException;
import im.sta.places.user.data.UserDto;
import im.sta.places.user.entity.UserEntity;
import im.sta.places.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.UUID;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository repo;
    private final ModelMapper mapper;

    public UserEntity searchByEmail(String email) {
        return repo.findByEmail(email);
    }

    public UserDto findUserById(final UUID id) {
        var user = repo.findById(id).orElseThrow(() -> new NotFoundException("User by id " + id + " was not found"));
        return EntityToDto(user);
    }

    public UserDto createUser(UserDto userDto, String password) throws NoSuchAlgorithmException {
        var user = DtoToEntity(userDto);

        if (password.isBlank()) throw new IllegalArgumentException("Password is required");

        if (repo.selectExistEmail(user.getEmail())) throw new BadRequestException("Given email busy");

        byte[] salt = createSalt();
        byte[] hashedPassword = createPasswordHash(password, salt);

        user.setStoredSalt(salt);
        user.setStoredHash(hashedPassword);

        repo.save(user);

        return EntityToDto(user);
    }

    public UserDto updateUser(UUID id, UserDto userDto, String pass) throws NoSuchAlgorithmException {
        var user = findOrThrow(id);
        var userParam = DtoToEntity(userDto);

        if (!StringUtils.isBlank(userParam.getEmail())) {
            user.setEmail(userParam.getEmail());
        }

        if (!StringUtils.isBlank(userParam.getName())) {
            user.setName(userParam.getName());
        }

        if (!StringUtils.isBlank(pass)) {
            byte[] salt = createSalt();
            byte[] hashedPassword = createPasswordHash(pass, salt);

            user.setStoredSalt(salt);
            user.setStoredHash(hashedPassword);
        }

        repo.save(user);
        return EntityToDto(user);
    }

    public void removeUserById(UUID id) {
        findOrThrow(id);
        repo.deleteById(id);
    }

    public void saveAvatar(UUID id, MultipartFile file) throws Exception {
        var user = findOrThrow(id);
        user.setAvatar(file.getBytes());
        repo.save(user);
    }

    public byte[] getAvatar(UUID id) throws Exception {
        return repo.getAvatar(id);
    }



    //////////////
    private UserDto EntityToDto(UserEntity entity) {
        return mapper.map(entity, UserDto.class);
    }

    private UserEntity DtoToEntity(UserDto dto) {
        return mapper.map(dto, UserEntity.class);
    }

    private byte[] createSalt() {
        var random = new SecureRandom();
        var salt = new byte[128];
        random.nextBytes(salt);

        return salt;
    }

    private byte[] createPasswordHash(String pass, byte[] salt) throws NoSuchAlgorithmException {
        var md = MessageDigest.getInstance("SHA-512");
        md.update(salt);

        return md.digest(pass.getBytes(StandardCharsets.UTF_8));
    }

    private UserEntity findOrThrow(final UUID id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("User by id " + id + " was not found"));

    }
}
