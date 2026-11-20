package com.organization.NoMindF.DTO;

import lombok.Data;

@Data
public class CreateOperatorDTO {
    private String username;
    private String contactNumber;
    private String password;
    private String role;
}