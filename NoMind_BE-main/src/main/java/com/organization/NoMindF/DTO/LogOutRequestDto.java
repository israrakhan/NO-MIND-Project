package com.organization.NoMindF.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogOutRequestDto {
    private String refreshToken;
}
