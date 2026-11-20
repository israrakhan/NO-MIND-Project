package com.organization.NoMindF.Repository;

import com.organization.NoMindF.Model.Enrollment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> , JpaSpecificationExecutor<Enrollment> {
    Page<Enrollment> findByStatusOrderByDateDesc(String status, Pageable pageable);

    Page<Enrollment> findByProgramId(Long programId, Pageable pageable);

    boolean existsByEmailAndProgramId(String email, Long programId);
    boolean existsByPhoneAndProgramId(String phone, Long programId);
}