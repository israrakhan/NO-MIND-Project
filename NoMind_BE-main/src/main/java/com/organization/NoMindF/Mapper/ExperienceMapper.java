package com.organization.NoMindF.Mapper;

import com.organization.NoMindF.DTO.ExperienceRequestDTO;
import com.organization.NoMindF.Model.Experiences;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ExperienceMapper {
    Experiences toExperiences(ExperienceRequestDTO request);
    void updateEntityFromDTO(ExperienceRequestDTO request, @MappingTarget Experiences experience);
}
