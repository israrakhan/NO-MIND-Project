package com.organization.NoMindF.Mapper;

import com.organization.NoMindF.DTO.InquirieRequest;
import com.organization.NoMindF.Model.FollowerInquiry;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InquiryMapper {
    FollowerInquiry toFollowerInquiry(InquirieRequest request);
}
