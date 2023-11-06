package im.sta.places.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "UUID") @Column(nullable = false, updatable = false)
    private UUID id;

    @Column(unique = true) private String email;

    private String name;
    private byte[] storedHash;
    private byte[] storedSalt;

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private boolean activated = false;

    private byte[] avatar;


    public UserEntity(String email, String name) {
        this.email = email;
        this.name = name;
    }

}
