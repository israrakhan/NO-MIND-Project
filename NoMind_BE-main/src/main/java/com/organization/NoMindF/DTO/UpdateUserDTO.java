package com.organization.NoMindF.DTO;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UpdateUserDTO {
    private Long adminId;
    @Pattern(
            regexp = "^[A-Za-z]+( [A-Za-z]+)+$",
            message = "Enter a valid full name like 'John Doe' or 'Jane Smith'"
    )
    private String fullName;
    @Pattern(regexp = "^[0-9]{10,12}$", message = "Please Enter 10 digits")
    private String phone;
    @Pattern(regexp = "^(?=.*[a-z])(?=.*\\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$",message = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character")
    private String password;
}
