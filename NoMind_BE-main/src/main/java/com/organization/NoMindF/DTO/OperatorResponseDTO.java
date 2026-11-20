package com.organization.NoMindF.DTO;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class OperatorResponseDTO {
    private Long adminId;
    private String fullName;
    private String phone;
    private String role;
    private Instant createdAt;
}
