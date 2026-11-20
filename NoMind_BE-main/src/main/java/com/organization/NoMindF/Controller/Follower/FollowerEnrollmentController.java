package com.organization.NoMindF.Controller.Follower;


import com.organization.NoMindF.DTO.ApiResponseDTO;
import com.organization.NoMindF.DTO.EnrollmentRequestDTO;
import com.organization.NoMindF.Service.EnrollmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/follower/enrollments")
@RequiredArgsConstructor
public class FollowerEnrollmentController {
  private final EnrollmentService service;
    @PostMapping
    public ResponseEntity<ApiResponseDTO<?>> create(@Valid @RequestBody EnrollmentRequestDTO dto) {
       try {
           service.create(dto);
           return ResponseEntity.ok( new ApiResponseDTO<>(
                   true,
                   "Enrollment done Successfully!",
                   null
           ));
       }
       catch (DataIntegrityViolationException ex) {

           return ResponseEntity.status(400).body(new ApiResponseDTO<>(
                   false,
                   "Enrollment with same email and phone already exists",
                   null
           ));
       }catch(RuntimeException exception)
       {
           return  ResponseEntity.status(400).body(new ApiResponseDTO<>(
                   false,
                   exception.getMessage(),
                   null
           ));
       }
    }
}
