package com.organization.NoMindF.Service;

import com.organization.NoMindF.DTO.AdminBookingStatusDto;
import com.organization.NoMindF.DTO.BookingModalDtoRequest;
import com.organization.NoMindF.DTO.BookingModalDtoResponse;
import com.organization.NoMindF.GlobalExceptionHandling.ResourceNotFoundException;
import com.organization.NoMindF.Mapper.BookingMapper;
import com.organization.NoMindF.Model.BookingsModel;
import com.organization.NoMindF.Repository.AdminBookingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AdminBookingService {
    private final BookingMapper bookingMapper;
    @Autowired
    AdminBookingsRepository adminBookingsRepository;

    public void addBooking(BookingModalDtoRequest bookingModalDtoRequest) {

        if (bookingModalDtoRequest.getDate() == null) {
            throw new RuntimeException("Booking date is required");
        }

        if (bookingModalDtoRequest.getDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Booking date cannot be in the past");
        }

        BookingsModel bookingsModel = bookingMapper.toBookingsModal(bookingModalDtoRequest);

        bookingsModel.setStatus("Pending");
        bookingsModel.setCreatedAt(LocalDateTime.now());

        adminBookingsRepository.save(bookingsModel);
    }

    public Page<BookingModalDtoResponse> getAllBookings(int page , int size) {
        Page<BookingsModel> bookingsPage = adminBookingsRepository
                .findAll(PageRequest.of(page, size, Sort.by("date").ascending()));
        return bookingsPage.map(bookingMapper::toBookingModalDto);
    }

    public BookingModalDtoResponse getBookingsById(int id) {
        BookingsModel bookingsModel =adminBookingsRepository.findById(id)
                .orElseThrow( ()-> new ResourceNotFoundException("Booking id not found having id : "+id) );
        return bookingMapper.toBookingModalDto(bookingsModel);
    }

    public void deleteBooking(int id) {

        if (!adminBookingsRepository.existsById(id)) {
            throw new ResourceNotFoundException("Booking not found with id: " + id);
        }
        adminBookingsRepository.deleteById(id);
    }

    public AdminBookingStatusDto updateStatus(int id, String status) {
        BookingsModel bookingsModel = adminBookingsRepository.findById(id)
                .orElseThrow( ()-> new ResourceNotFoundException("Booking id not found having id : "+id) );
        bookingsModel.setStatus(status);
        adminBookingsRepository.save(bookingsModel);
        AdminBookingStatusDto adminBookingStatusDto = new AdminBookingStatusDto();
        adminBookingStatusDto.setId(id);
        adminBookingStatusDto.setStatus(status);
        return adminBookingStatusDto;
    }
}
