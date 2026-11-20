package com.organization.NoMindF.Service;

import com.organization.NoMindF.DTO.AdminLoginDTO;
import com.organization.NoMindF.DTO.AdminRegisterDTO;
import com.organization.NoMindF.DTO.LogOutRequestDto;
import com.organization.NoMindF.Model.Admin;
import com.organization.NoMindF.Model.RefreshToken;
import com.organization.NoMindF.Repository.AdminRegistrationRepository;
import com.organization.NoMindF.Repository.RefreshTokenRepository;
import com.organization.NoMindF.Security.JwtService;
import com.organization.NoMindF.Security.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j2
@Service
@RequiredArgsConstructor
public class AdminRegistrationService {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtService jwtService;
    @Autowired
    RefreshTokenService refreshTokenService;
    @Autowired
    RefreshTokenRepository refreshTokenRepository;
    private final   BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final AdminRegistrationRepository adminRegistrationRepository;

    public void registeringAdmin(AdminRegisterDTO adminRegisterDTO) {
        Admin admin = new Admin();

        admin.setPhone(adminRegisterDTO.getPhone());
        if(adminRegistrationRepository.countByRole("ADMIN")>1){
            throw new RuntimeException("Admin already exists. Login via the existing id");
        }
        else if(adminRegisterDTO.getPhone()!=null &&
                adminRegistrationRepository.existsByPhone(adminRegisterDTO.getPhone()))
        {
            throw new RuntimeException("Phone number already exists");
        }
        String password = passwordEncoder.encode(adminRegisterDTO.getPassword());
        admin.setPassword(password);
        admin.setFullName(adminRegisterDTO.getFullName());
        admin.setRole("ADMIN");
        admin.setCreatedAt(java.time.Instant.now());
        //admin.setOTP(adminRegisterDTO.getOTP());

        adminRegistrationRepository.save(admin);
    }

    public List<Admin> getAdmins() {

        log.info("AdminRegistrationService : INSIDE getAdmins METHOD");
        return adminRegistrationRepository.findAll();

    }

    //called JWTService, RefreshTokenService, RefreshToken(modal)
    public Map<String, Object> adminLogging(AdminLoginDTO adminLoginDTO) {
        // Admin admin = new Admin();
        if((!adminRegistrationRepository.existsByPhone(adminLoginDTO.getPhone())))
        {
            throw new RuntimeException("Admin not exist");
        }

        Authentication authentication= authenticationManager.authenticate
                (
                        new UsernamePasswordAuthenticationToken(
                                adminLoginDTO.getPhone(),
                                adminLoginDTO.getPassword()
                        )
                );
        if(authentication.isAuthenticated()) {
            log.info("Admin logged in successfully");

            // Fetch the user to determine their role
            Admin admin = adminRegistrationRepository.findByPhone(adminLoginDTO.getPhone());
            String userType = admin.getRole() != null ? admin.getRole() : "Admin";

            String token = jwtService.generateToken(adminLoginDTO.getPhone(), userType);
            System.out.println("token generated is :"+token);
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(adminLoginDTO.getPhone(), userType);

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", token);
            response.put("refreshToken", refreshToken.getToken());
            response.put("fullName", admin.getFullName());
            response.put("userType", userType);

            return response;
        } else {
            return Map.of("message", "Invalid credentials");
        }

    }
    public String logOut(LogOutRequestDto logOutRequestDto)
    {
        System.out.println("at service for logout : "+ logOutRequestDto.getRefreshToken());
        RefreshToken token = refreshTokenRepository
                .findByToken(logOutRequestDto.getRefreshToken());
        if(!token.equals(token))
        {
            throw new RuntimeException("No token found");
        }
        refreshTokenRepository.delete(token);
        return "Logged out successfully";
    }
}
