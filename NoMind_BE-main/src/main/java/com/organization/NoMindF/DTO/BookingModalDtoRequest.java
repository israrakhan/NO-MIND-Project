package com.organization.NoMindF.DTO;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingModalDtoRequest {
    private String clientName;
    private String service;
    private String bookingType;
    private Long participants;
    private String ageGroup;
    private String occupation;



    @NotNull(message = "Booking date is required")
    @FutureOrPresent(message = "Booking date cannot be in the past")
    private LocalDate date;


    private LocalTime time;
    private String status;
    private LocalDateTime createdAt;
}
