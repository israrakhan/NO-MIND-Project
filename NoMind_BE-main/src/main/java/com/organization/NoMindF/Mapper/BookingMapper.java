package com.organization.NoMindF.Mapper;

import com.organization.NoMindF.DTO.BookingModalDtoRequest;
import com.organization.NoMindF.DTO.BookingModalDtoResponse;
import com.organization.NoMindF.Model.BookingsModel;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookingMapper {
    BookingModalDtoResponse toBookingModalDto(BookingsModel bookingsModel);//lets say for Get
    BookingsModel toBookingsModal(BookingModalDtoResponse bookingModalDtoResponse);//lets say for Post
    BookingsModel toBookingsModal(BookingModalDtoRequest bookingModalDtoRequest);
}
