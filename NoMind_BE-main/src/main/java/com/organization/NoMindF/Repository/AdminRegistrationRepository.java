package com.organization.NoMindF.Repository;

import com.organization.NoMindF.Model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRegistrationRepository extends JpaRepository<Admin ,Long> {
    boolean existsByPhone(String phone);
    Admin findByPhone(String phone);
    Long countByRole(String role);
}
