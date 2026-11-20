package com.organization.NoMindF.Model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.Instant;

@Data
@Entity
@Table(name = "refresh_tokens")
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String token;
    private String userType;
    private String phone;
    private Instant issuedAt;
    private Instant expiresAt;
    @Column(nullable = false)
    private boolean revoked = false;
}
