package com.organization.NoMindF.Controller.admin;

import com.organization.NoMindF.DTO.*;
import com.organization.NoMindF.Service.OperatorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/operator")
@RequiredArgsConstructor
public class OperatorController {

    private final OperatorService service;

    @GetMapping
    public ResponseEntity<ApiResponseDTO<List<OperatorResponseDTO>>> getAll() {
       try{

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ApiResponseDTO<>(
                           true,
                           "Operators retrieved successfully",
                            service.getAll()));
       }
       catch(Exception e){
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                   new ApiResponseDTO<>(
                           false,
                           "No data found",
                           null
                   )
           );
       }

    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<OperatorResponseDTO>> getOne(@PathVariable Long id) {
        try{

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ApiResponseDTO<>(
                            true,
                            "Operators retrieved successfully",
                            service.getById(id)));
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ApiResponseDTO<>(
                            false,
                            "No data found",
                            null
                    )
            );
        }
    }

@PostMapping
public ResponseEntity<ApiResponseDTO<?>> create(@Valid @RequestBody OperatorRegisterDTO dto) {
    try {
        service.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ApiResponseDTO<>(
                        true,
                        "Operator created successfully",
                        null
                ));
    } catch (RuntimeException e){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                new ApiResponseDTO<>(
                        false,
                        e.getMessage(),
                        null
                ));
    }
}

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<OperatorResponseDTO>> update(
            @PathVariable Long id,
            @Valid
            @RequestBody UpdateUserDTO updateUserDTO
    ) {
        try {
           // service.update(id, updateUserDTO);
            OperatorResponseDTO response = service.update(id, updateUserDTO);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ApiResponseDTO<>(
                            true,
                            "Operator updated successfully",
                            response
                    ));
        }
        catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ApiResponseDTO<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<?>> delete(@PathVariable Long id) {
       try {
           service.delete(id);
           return ResponseEntity.status(HttpStatus.OK).body(
                   new ApiResponseDTO<>(
                           true,
                           "Operator deleted successfully",
                           null
                   )
           );
       }
       catch (RuntimeException e) {
           return ResponseEntity.status(HttpStatus.CONFLICT).body(
                   new ApiResponseDTO<>(
                           true,
                           "Issue while deleting operator",
                           null
                   ));
       }
    }
}