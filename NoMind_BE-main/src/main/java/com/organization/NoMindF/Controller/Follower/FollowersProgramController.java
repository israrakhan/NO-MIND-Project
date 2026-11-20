package com.organization.NoMindF.Controller.Follower;

import com.organization.NoMindF.DTO.AdminProgramsDTO;
import com.organization.NoMindF.DTO.ApiResponseDTO;
import com.organization.NoMindF.Service.AdminProgramsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/follower/programs")
@RequiredArgsConstructor
@Log4j2
public class FollowersProgramController {
    private final AdminProgramsService adminProgramsService;

    @GetMapping
    public ResponseEntity<ApiResponseDTO<?>> getPrograms(
            @RequestParam(required = false) Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        try {
            log.info("FollowersProgramController.getProgramsList() - START | programId={}", id);
            Page<AdminProgramsDTO> programs = adminProgramsService.getActivePrograms(page, size);

            if (programs.isEmpty()) {
                log.info("FollowerProgramController.getProgramsList() - No Programs found");
                return ResponseEntity.ok(new ApiResponseDTO<>(
                        true,
                        "No Programs available",
                        programs
                ));
            }

            log.info("FollowersProgramController.getProgramsList() - Retrieved {} programs", programs.getTotalElements());
            return ResponseEntity.ok(new ApiResponseDTO<>(
                    true,
                    "Programs retrieved successfully",
                    programs
            ));
        } catch (Exception ex) {
            log.error("FollowersProgramController.getProgramsList() - ERROR: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponseDTO<>(
                            false,
                            "Failed to retrieve Programs: " + ex.getMessage(),
                            null
                    ));
        }
    }
}
