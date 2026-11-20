package com.organization.NoMindF.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ExperienceRequestDTO {

    @NotBlank(message = "Title Required")
    private String title;
    @NotBlank(message = "Year Required")
    private String year;
    private String displayOrder;
    private String icon;
    @NotBlank(message ="Description Required" )
    private String description;

}
