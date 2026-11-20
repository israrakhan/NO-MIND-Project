package com.organization.NoMindF.Controller.admin;

import com.organization.NoMindF.DTO.ApiResponseDTO;
import com.organization.NoMindF.DTO.ExperienceRequestDTO;
import com.organization.NoMindF.Service.ExperienceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminExperienceController {

    private final ExperienceService experienceService;

    @PostMapping("/experience")
    public ResponseEntity<ApiResponseDTO<?>> postExperience(
            @Valid @RequestBody ExperienceRequestDTO request
    ) {
        try {
            log.info("API called : POST /admin/experience");

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponseDTO<>(
                            true,
                            "Experience created successfully",
                            experienceService.createExperience(request)
                    ));

        } catch (RuntimeException e) {
            log.error("Error in POST /admin/experience : {}", e.getMessage());

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponseDTO<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }

    @PutMapping("/experience/{expId}")
    public ResponseEntity<ApiResponseDTO<?>> updateExperience(
            @PathVariable Long expId,
            @Valid @RequestBody ExperienceRequestDTO request
    ) {
        try {
            log.info("API called : PUT /admin/experience/{}", expId);

            return ResponseEntity.ok(
                    new ApiResponseDTO<>(
                            true,
                            "Experience updated successfully",
                            experienceService.updateExperience(expId, request)
                    )
            );

        } catch (RuntimeException e) {
            log.error("Error in PUT /admin/experience/{} : {}", expId, e.getMessage());

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponseDTO<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }

    @DeleteMapping("/experience/{expId}")
    public ResponseEntity<ApiResponseDTO<?>> deleteExperience(
            @PathVariable Long expId
    ) {
        try {
            log.info("API called : DELETE /admin/experience/{}", expId);

            experienceService.deleteExperience(expId);

            return ResponseEntity.ok(
                    new ApiResponseDTO<>(
                            true,
                            "Experience deleted successfully",
                            null
                    )
            );

        } catch (RuntimeException e) {
            log.error("Error in DELETE /admin/experience/{} : {}", expId, e.getMessage());

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponseDTO<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }
}