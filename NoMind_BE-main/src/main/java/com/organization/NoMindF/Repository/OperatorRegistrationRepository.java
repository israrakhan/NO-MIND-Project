package com.organization.NoMindF.Repository;

import com.organization.NoMindF.Model.Admin;
import jakarta.validation.constraints.Pattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OperatorRegistrationRepository extends JpaRepository<Admin, Long> {
    Long countByRole(String role);
    boolean existsByPhone(@Pattern(regexp = "^[0-9]{10,12}$", message = "Please Enter 10 digits") String phone);
    @Query("SELECT a.role FROM Admin a WHERE a.adminId = :id")
    String getRoleById(@Param("id") Long id);

    boolean existsByFullName(String fullName);
    boolean existsByPhoneAndAdminIdNot(String phone, Long adminId);
    List<Admin> findByRole(String role);
}