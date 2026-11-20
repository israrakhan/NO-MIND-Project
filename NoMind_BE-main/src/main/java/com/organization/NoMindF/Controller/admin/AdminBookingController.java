package com.organization.NoMindF.Controller.admin;

import com.organization.NoMindF.DTO.*;
import com.organization.NoMindF.Service.AdminBookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminBookingController {

    @Autowired
    AdminBookingService adminBookingService;
    @PostMapping("/bookings")
    public ResponseEntity<ApiResponseDTO<?>> registerBooking(@Valid @RequestBody BookingModalDtoRequest bookingModalDtoRequest)    {
            adminBookingService.addBooking(bookingModalDtoRequest);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponseDTO<>(
                            true,
                            "Booking has been successfully registered",
                            "Successfully registered!"

                    ));
    }

    @GetMapping("/bookings")
    public ResponseEntity<ApiResponseDTO<Page<BookingModalDtoResponse>>> registerOfBooking(@RequestParam(defaultValue = "0") int page,
                                                                                   @RequestParam(defaultValue = "20") int size) {
            Page<BookingModalDtoResponse> booking = adminBookingService.getAllBookings(page, size);
            return ResponseEntity.ok(new ApiResponseDTO<>(
                    true,
                    "Data retrieved successfully",
                    booking
            ));
    }
    @GetMapping("/bookings/{id}")
    public ResponseEntity<ApiResponseDTO<?>> getBookings(@PathVariable int id)
    {
            BookingModalDtoResponse bookingModalDtoResponse = adminBookingService.getBookingsById(id);
            return ResponseEntity.ok(new ApiResponseDTO<>(
                    true,
                    "Booking Id is available",
                    bookingModalDtoResponse
            ));
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<ApiResponseDTO<?>> deleteBooking(@PathVariable int id)
    {
            adminBookingService.deleteBooking(id);
            return ResponseEntity.ok(new ApiResponseDTO<>(
                    true,
                    "Booking has been successfully deleted",
                    null
            ));
    }
    @PatchMapping("/bookings/{id}/status")
    public ResponseEntity<ApiResponseDTO<?>> updateBookingStatus(
            @PathVariable int id, @RequestParam String status) {
            AdminBookingStatusDto adminBookingStatusDto  = adminBookingService.updateStatus(id, status);
            adminBookingStatusDto.setId(id);
            adminBookingStatusDto.setStatus(adminBookingStatusDto.getStatus());
            return ResponseEntity.ok(new ApiResponseDTO<>(
                    true,
                    "Status has been successfully updated",
                    adminBookingStatusDto
            ));

    }

}
