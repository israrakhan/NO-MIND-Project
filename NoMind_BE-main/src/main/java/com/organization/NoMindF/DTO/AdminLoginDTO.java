package com.organization.NoMindF.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AdminLoginDTO {
    @NotBlank(message= "Please enter phone number")
    private String phone;
    @NotBlank(message= "Please enter Password")
    private String password;
}
