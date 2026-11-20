package com.organization.NoMindF.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        uniqueConstraints = {@UniqueConstraint(columnNames = {"email","programId"})
                ,@UniqueConstraint(columnNames = {"phone","programId"})})
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @NotBlank(message = "Email is mandatory")
    private String email;
    @NotBlank(message = "Phone Number is mandatory")
    private String phone;
    private String ageGroup;
    private String occupation;

    @Column(length = 1000)
    private String message;

    private String program;
    private Long programId;

    private String status; // new, contacted, confirmed, cancelled

    @Column(length = 1000)
    private String notes;

    @CreationTimestamp
    private LocalDateTime date;
}