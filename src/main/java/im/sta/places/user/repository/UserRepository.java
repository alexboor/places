package im.sta.places.user.repository;

import im.sta.places.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN TRUE ELSE FALSE END FROM UserEntity u WHERE u.email = ?1")
    Boolean selectExistEmail(String email);

    @Query("SELECT u.avatar FROM UserEntity u WHERE u.id = ?1")
    byte[] getAvatar(UUID id);

    UserEntity findByEmail(String email);

}
