package com.organization.NoMindF.Model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "bookings")
public class BookingsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String clientName;
    @JsonFormat(pattern="yyyy-mm-dd")
    private LocalDate date;
    @JsonFormat(pattern="HH:mm")
    private LocalTime time;
    private String status;
    private String service;
    private String bookingType;
    private Long participants;
    private String ageGroup;
    private String occupation;
    private LocalDateTime createdAt;
    //No need to pass date and time from postman as its
    //already getting set!!
    //we need to think of appointment timing as well

}
