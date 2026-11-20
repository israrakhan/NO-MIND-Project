package com.organization.NoMindF.Controller.admin;

import com.organization.NoMindF.DTO.ApiResponseDTO;
import com.organization.NoMindF.DTO.AdminProgramsDTO;
import com.organization.NoMindF.Mapper.ProgramsMapper;
import com.organization.NoMindF.Model.Enrollment;
import com.organization.NoMindF.Model.ProgramsModel;
import com.organization.NoMindF.Service.AdminProgramsService;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;

import javax.swing.*;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/admin/programs")
@RequiredArgsConstructor
@Log4j2
public class AdminProgramsController {
    private final AdminProgramsService adminProgramsService;
    private final ProgramsMapper programsMapper;
    private final Validator validator;

    @GetMapping
    public ResponseEntity<ApiResponseDTO<?>> getPrograms(
            @RequestParam(required = false) Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        try {
            log.info("AdminProgramsController.getPrograms() - START | programId={}", id);
            Page<AdminProgramsDTO> programs = adminProgramsService.getProgramsList(id, page, size);

            if (programs.isEmpty()) {
                log.info("AdminProgramsController.getPrograms() - No Programs found");
                return ResponseEntity.ok(new ApiResponseDTO<>(
                        true,
                        "No Programs available",
                        programs
                ));
            }

            log.info("AdminProgramsController.getprograms() - Retrieved {} programs", programs.getTotalElements());
            return ResponseEntity.ok(new ApiResponseDTO<>(
                    true,
                    "Programs retrieved successfully",
                    programs
            ));
        } catch (Exception ex) {
            log.error("AdminProgramsController.getPrograms() - ERROR: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponseDTO<>(
                            false,
                            "Failed to retrieve programs: " + ex.getMessage(),
                            null
                    ));
        }
    }

    @PostMapping(value = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponseDTO<?>> saveUpdateProgram(
            @RequestParam(value = "image", required = false)MultipartFile imageFile,
            @RequestParam("event") String eventJSON
    ){
        try{
            ObjectMapper mapper = new ObjectMapper();
            AdminProgramsDTO dto = mapper.readValue(eventJSON, AdminProgramsDTO.class);

            if(dto.getId() == 0 && (imageFile == null || imageFile.isEmpty())){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponseDTO<>(false, "Validation Failed: Image is required", null));
            }

            Set<ConstraintViolation<AdminProgramsDTO>> violations = validator.validate(dto);

            if(!violations.isEmpty()){
                String errors = violations.stream()
                        .map(ConstraintViolation::getMessage)
                        .collect(Collectors.joining(", "));
                log.error("Validation failed: {}",errors);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponseDTO<>(false, "Validation Failed: "+errors, null));
            }

            log.info("AdminProgramsController.saveUpdateProgram() - START | pProgramsId={}", dto.getId());
            log.info("AdminProgramsController.saveUpdateProgram() - Image received: {}", imageFile != null ? (imageFile.isEmpty() ? "EMPTY FILE" : imageFile.getOriginalFilename()) : "NULL");
            log.info("AdminProgramsController.saveUpdateProgram() - Image size: {} bytes", imageFile != null ? imageFile.getSize() : 0);

            ProgramsModel event = programsMapper.toProgramsModel(dto);

            AdminProgramsDTO savedProgram = adminProgramsService.createUpdateEvent(event, imageFile);
            log.info("AdminProgramsController.saveUpdateProgram() - Program saved with id={}", savedProgram.getId());
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponseDTO<>(
                            true,
                            "Program saved successfully",
                            savedProgram
                    ));
        }catch(IllegalStateException ex){
            log.error("AdminProgramsController.saveUpdateProgram() - State error: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponseDTO<>(
                            false,
                            ex.getMessage(),
                            null
                    ));
        }catch(IllegalArgumentException ex){
            log.error("AdminProgramsController.saveUpdateProgram() - Invalid input: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponseDTO<>(
                            false,
                            ex.getMessage(),
                            null
                    ));
        }catch(Exception ex){
            log.error("AdminProgramsController.saveUpdateProgram() - ERROR: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponseDTO<>(
                            false,
                            "Failed to save program: " + ex.getMessage(),
                            null
                    ));
        }
    }


    @GetMapping("/enrollments/{programId}")
    public ResponseEntity<ApiResponseDTO<?>> getEmrollmentsByProgramId(
            @PathVariable Long programId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size

    ){
        try {
            Page<Enrollment> enrollments = adminProgramsService.getEnrollmentList(programId,page,size);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponseDTO<>(
                            true,
                            "Enrollment lisr retrived by program Id",
                            enrollments
                    ));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponseDTO<>(
                            false,
                            ex.getMessage(),
                            null
                    ));
        }

    }



    @DeleteMapping
    public ResponseEntity<ApiResponseDTO<?>> deleteProgram(
            @RequestParam Long id
    ){
        try{
            log.info("AdminProgramsController.deleteProgram() - START | programId={}", id);
            adminProgramsService.deleteProgram(id);
            log.info("AdminProgramsController.deleteProgram() - Program deleted successfully with id={}", id);
            return ResponseEntity.ok(new ApiResponseDTO<>(
                    true,
                    "Program deleted successfully",
                    null
            ));
        }catch(RuntimeException ex){
            log.error("AdminProgramsController.deleteProgram() - ERROR: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponseDTO<>(
                            false,
                            ex.getMessage(),
                            null
                    ));
        }catch(Exception ex){
            log.error("AdminProgramsController.deleteProgram() - ERROR: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponseDTO<>(
                            false,
                            "Failed to delete program: " + ex.getMessage(),
                            null
                    ));
        }
    }
}
