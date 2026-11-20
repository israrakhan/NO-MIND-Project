package com.organization.NoMindF.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EnrollmentRequestDTO {
    @NotBlank(message = "Name is Required!")
    private String name;
    @NotBlank(message = "Email is Required!")
    @Email(message = "Email must be valid!")
    private String email;
    @NotBlank(message = "Phone is Required!")
    private String phone;
    private String ageGroup;
    private String occupation;
    private String message;
    private String program;
    private Long programId;
}