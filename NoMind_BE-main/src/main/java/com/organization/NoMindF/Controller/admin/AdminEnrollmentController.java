package com.organization.NoMindF.Controller.admin;

import com.organization.NoMindF.DTO.ApiResponseDTO;
import com.organization.NoMindF.DTO.UpdateNotesDTO;
import com.organization.NoMindF.DTO.UpdateStatusDTO;
import com.organization.NoMindF.Model.Enrollment;
import com.organization.NoMindF.Service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/enrollments")
@RequiredArgsConstructor

public class AdminEnrollmentController {
    private final EnrollmentService service;

    @GetMapping
    public ResponseEntity<ApiResponseDTO<Page<Enrollment>>> getAll(
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Page<Enrollment> enrollments = service.getAll(status, page, size);

        if (enrollments.isEmpty()) {
            return ResponseEntity.ok(new ApiResponseDTO<>(true, "No enrollments found", enrollments));
        }

        return ResponseEntity.ok(new ApiResponseDTO<>(true, "Enrollments retrieved successfully", enrollments));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Enrollment>> getOne(@PathVariable Long id) {

        Enrollment enrollment = service.getById(id);

        if (enrollment == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponseDTO<>(false, "Enrollment not found", null));
        }

        return ResponseEntity.ok(
                new ApiResponseDTO<>(true, "Enrollment fetched successfully", enrollment)
        );
    }
    @PatchMapping("/{id}/status")
    public Enrollment updateStatus(
            @PathVariable Long id,
            @RequestBody UpdateStatusDTO dto
    ) {
        return service.updateStatus(id, dto.getStatus());
    }

    @PatchMapping("/{id}/notes")
    public Enrollment updateNotes(
            @PathVariable Long id,
            @RequestBody UpdateNotesDTO dto
    ) {
        return service.updateNotes(id, dto.getNotes());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<?>> deleteEnrollment(@PathVariable Long id) {

        boolean isDeleted = service.delete(id);

        if (!isDeleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponseDTO<>(false, "Enrollment not found", null));
        }

        return ResponseEntity.ok(
                new ApiResponseDTO<>(true, "Enrollment deleted successfully", null)
        );
    }
}
