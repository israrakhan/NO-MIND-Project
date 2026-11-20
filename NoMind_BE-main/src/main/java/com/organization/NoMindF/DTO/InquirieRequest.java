package com.organization.NoMindF.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InquirieRequest {

    @NotBlank (message = "Name Required")
    private String name;

    @Email (message = "Invalid Email")
    @NotBlank (message = "Email Required")
    private String email;

    @NotBlank(message = "Phone Required")
    private String phone;

    private String interest;

    @NotBlank(message = "Message Required")
    private String message;

}
