package com.organization.NoMindF.DTO;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingModalDtoResponse {
    private Long id;
    private String clientName;
    private String service;
    private String bookingType;
    private Long participants;
    private String ageGroup;
    private String occupation;
    private LocalDate date;
    private LocalTime time;
    private String status;
    private LocalDateTime createdAt;
}
