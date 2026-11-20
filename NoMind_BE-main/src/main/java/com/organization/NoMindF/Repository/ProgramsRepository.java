package com.organization.NoMindF.Repository;

import com.organization.NoMindF.Model.ProgramStatus;
import com.organization.NoMindF.Model.ProgramsModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramsRepository extends JpaRepository<ProgramsModel, Long> {
    Page<ProgramsModel> findByEventStatus(ProgramStatus status, Pageable pageable);
}
