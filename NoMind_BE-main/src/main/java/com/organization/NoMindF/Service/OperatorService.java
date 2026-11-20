package com.organization.NoMindF.Service;

import com.organization.NoMindF.DTO.*;
import com.organization.NoMindF.Mapper.OperatorMapper;
import com.organization.NoMindF.Model.Admin;
import com.organization.NoMindF.Repository.OperatorRegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OperatorService {
    private final OperatorRegistrationRepository operatorRegistrationRepository;
    private final PasswordEncoder passwordEncoder;
    private final OperatorMapper  operatorMapper;

    // CREATE USER
    public void create(OperatorRegisterDTO operatorRegisterDTO) {
        Admin admin = new Admin();

        admin.setPhone(operatorRegisterDTO.getPhone());
        if(operatorRegistrationRepository.countByRole("OPERATOR")>2){
            throw new RuntimeException("Admin already exists. Login via the existing id");
        }
        else if(operatorRegisterDTO.getPhone()!=null &&
                operatorRegistrationRepository.existsByPhone(operatorRegisterDTO.getPhone()))
        {
            throw new RuntimeException("Phone number already exists");
        }
        String password = passwordEncoder.encode(operatorRegisterDTO.getPassword());
        admin.setPassword(password);
        admin.setFullName(operatorRegisterDTO.getFullName());
        admin.setRole("OPERATOR");
        admin.setCreatedAt(java.time.Instant.now());
        operatorRegistrationRepository.save(admin);
    }
    // GET ALL
    public List<OperatorResponseDTO> getAll() {
        return operatorRegistrationRepository.findByRole("OPERATOR")
                .stream()
                .map(operatorMapper::toDTO)
                .toList();

    }

    // GET ONE
    public OperatorResponseDTO getById(Long id) {
        Admin admin = operatorRegistrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Operator not found"));

        OperatorResponseDTO dto = operatorMapper.toDTO(admin);
        System.out.println("Fetched Admin: id=" + admin.getAdminId() + ", fullName=" + admin.getFullName() + ", mapped to DTO: adminId=" + dto.getAdminId());
        return dto;
    }

    // UPDATE
    public OperatorResponseDTO update(Long adminId, UpdateUserDTO updateUserDTO) {
        com.organization.NoMindF.Model.Admin admin
                = operatorRegistrationRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Operator not found"));

        if (updateUserDTO.getPhone() != null &&
                operatorRegistrationRepository.existsByPhoneAndAdminIdNot(updateUserDTO.getPhone(), admin.getAdminId())) {

            throw new RuntimeException("Contact number already exists");
        }


        if (updateUserDTO.getFullName() != null &&
                operatorRegistrationRepository.existsByFullName(updateUserDTO.getFullName()) &&
                !updateUserDTO.getFullName().equals(admin.getFullName())) {

            throw new RuntimeException("Username already exists");
        }


        operatorMapper.updateOperator(updateUserDTO, admin);


        if (updateUserDTO.getPassword() != null && !updateUserDTO.getPassword().isBlank()) {
            admin.setPassword(passwordEncoder.encode(updateUserDTO.getPassword()));
        }

        return operatorMapper.toDTO(operatorRegistrationRepository.save(admin));
    }

    // DELETE
    public void delete(Long adminId) {
        if(operatorRegistrationRepository.getRoleById(adminId).equals("ADMIN"))
        {throw new  RuntimeException("You cannot delete Admin!");}
        operatorRegistrationRepository.deleteById(adminId);
    }


}