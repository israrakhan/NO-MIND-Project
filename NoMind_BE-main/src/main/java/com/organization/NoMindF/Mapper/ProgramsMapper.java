package com.organization.NoMindF.Mapper;

import com.organization.NoMindF.DTO.AdminProgramsDTO;
import com.organization.NoMindF.Model.ProgramsModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProgramsMapper {
    ProgramsModel toProgramsModel(AdminProgramsDTO adminProgramsDTO);
    AdminProgramsDTO toAdminProgramsDTO(ProgramsModel programsModel);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "image", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "eventStatus", ignore = true)
    void updateProgramFromModel(ProgramsModel source, @MappingTarget ProgramsModel target);
}
