package com.organization.NoMindF.Mapper;

import com.organization.NoMindF.DTO.OperatorResponseDTO;
import com.organization.NoMindF.DTO.UpdateUserDTO;
import com.organization.NoMindF.Model.Admin;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface OperatorMapper {
    OperatorResponseDTO toDTO(Admin admin);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateOperator(UpdateUserDTO dto, @MappingTarget Admin admin);
}