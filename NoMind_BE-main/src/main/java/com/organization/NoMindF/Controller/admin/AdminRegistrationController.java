package com.organization.NoMindF.Controller.admin;

import com.organization.NoMindF.DTO.AdminLoginDTO;
import com.organization.NoMindF.DTO.AdminRegisterDTO;
import com.organization.NoMindF.DTO.ApiResponseDTO;
import com.organization.NoMindF.DTO.LogOutRequestDto;
import com.organization.NoMindF.Model.Admin;
import com.organization.NoMindF.Service.AdminRegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
@Log4j2
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@RestController
public class AdminRegistrationController {

    private final AdminRegistrationService adminRegistrationService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponseDTO<String>> registerAdmin(@Valid @RequestBody AdminRegisterDTO adminRegisterDTO)
    {
        try{
            log.info("Admin Registration Controller : Calling admin/register API");
            adminRegistrationService.registeringAdmin(adminRegisterDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponseDTO<>(
                    true,
                    "Admin registration Done!",
                    null
            ));}
        catch (RuntimeException ex){
            log.info("Admin Registration Controller : Failed to register admin");
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponseDTO<>(
                    false,
                    ex.getMessage(),
                    null
            ));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDTO<?>> login(@Valid @RequestBody AdminLoginDTO adminLoginDTO){
        try {
            log.info("Inside Admin login : Calling login API");
            Map<String, Object> data = adminRegistrationService.adminLogging(adminLoginDTO);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponseDTO<>(
                            true,
                            "Logged in",
                            data
                    ));
        } catch (RuntimeException ex) {
            log.info("Inside Admin login : Failed to login");
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponseDTO<>(
                            false,
                            ex.getMessage(),
                            null
                    ));
        }
    }

    @GetMapping("/getadmin")
    public ResponseEntity<ApiResponseDTO<?>> getAdmins(){

        try {
            log.info("Inside AdminRegistrationController : Calling admin/getadmins API");
            List<Admin> newAdmin = adminRegistrationService.getAdmins();
            log.info("Inside AdminRegistrationController : Executed admin/createUpdate API successful");
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponseDTO<>(
                            true,
                            "Admin Got Created",
                            newAdmin
                    ));
        } catch (Exception ex) {
            log.error("ERROR IN admin/getadmin API OR ADMIN NOT ABLE TO Get");
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponseDTO<>(
                            false,
                            ex.getMessage(),
                            null
                    ));
        }
    }
    @PostMapping("/logout")
    public ResponseEntity<ApiResponseDTO<String>> logout(@RequestBody LogOutRequestDto logOutRequestDto){
        try{
            System.out.println("At Logout controller : " + logOutRequestDto.getRefreshToken());
            adminRegistrationService.logOut(logOutRequestDto);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponseDTO<>(
                            true,
                            "Logged out successfully",
                            null
                    ));
        }
        catch(Exception ex)
        {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponseDTO<>(
                            false,
                            ex.getMessage(),
                            null
                    ));
        }
    }

}
