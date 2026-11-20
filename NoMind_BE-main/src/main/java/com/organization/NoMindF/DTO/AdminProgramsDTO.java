package com.organization.NoMindF.DTO;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class AdminProgramsDTO {
    private long id;

    @NotBlank(message = "Title is required!")
    private String title;

    private String icon;

    @NotBlank(message = "Duration is required!")
    private String duration;

    @NotBlank(message = "Level is required!")
    private String level;

    @NotNull(message = "Date is required!")
    private LocalDate date;

    @NotBlank(message = "Location is required!")
    private String location;

    private String description;

    private String eventStatus;

    private String image;

    @NotEmpty(message = "Highlights must have atleast one value!")
    private List<String> highlights;
}
