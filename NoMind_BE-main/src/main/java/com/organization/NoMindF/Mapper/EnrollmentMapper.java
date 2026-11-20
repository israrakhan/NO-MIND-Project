package com.organization.NoMindF.Mapper;

import com.organization.NoMindF.DTO.EnrollmentRequestDTO;
import com.organization.NoMindF.Model.Enrollment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EnrollmentMapper {

    Enrollment toEnrollment(EnrollmentRequestDTO dto);
}
