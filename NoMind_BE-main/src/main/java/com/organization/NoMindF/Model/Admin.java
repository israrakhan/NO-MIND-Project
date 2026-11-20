package com.organization.NoMindF.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="admin", uniqueConstraints = {
        @UniqueConstraint(columnNames = "phone")
})
@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminId;
    private String fullName;
    private String phone;
    private String password;
    private String role;
    private Instant createdAt;
}
