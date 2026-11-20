package com.organization.NoMindF.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class OperatorRegisterDTO {
    @NotBlank(message= "Please enter phone number")
    @Pattern(regexp = "^[0-9]{10,12}$", message = "Please Enter 10 digits")
    private String phone;
    @NotBlank(message= "Please enter password")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*\\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$",message = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character")
    private String password;
    @Pattern(
            regexp = "^[A-Za-z]+( [A-Za-z]+)+$",
            message = "Enter a valid full name like 'John Doe' or 'Jane Smith'"
    )
    @NotBlank(message = "Please enter full name")
    private String fullName;
    private Instant createdAt;
    //private String OTP;
}
