package com.organization.NoMindF.Repository;

import com.organization.NoMindF.Model.Experiences;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceRepository extends JpaRepository<Experiences, Long> {


    Page<Experiences> findByExpId(Long expId, Pageable pageable);

    boolean existsByDisplayOrder(String displayOrder);
}
