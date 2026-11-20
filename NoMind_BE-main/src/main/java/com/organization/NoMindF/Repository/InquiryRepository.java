package com.organization.NoMindF.Repository;

import com.organization.NoMindF.Model.FollowerInquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InquiryRepository extends JpaRepository<FollowerInquiry, Long>{

    @Modifying
    @Query("UPDATE FollowerInquiry i SET i.read = true WHERE i.inquiryId IN :ids")
    void markAsReadByIds(@Param("ids") List<Long> ids);

    @Query("SELECT i FROM FollowerInquiry i " +
           "WHERE (:read IS NULL OR i.read = :read) " +
           "AND (:interest IS NULL OR " +
           "     (:interest = 'Other / General Inquiry' AND i.interest NOT IN ('NLP Practitioner Certification', 'Mindfulness & Meditation Immersion', 'Leadership & Communication Mastery', 'Youth Empowerment Workshop', 'Custom Corporate Program')) OR " +
           "     (:interest != 'Other / General Inquiry' AND LOWER(i.interest) LIKE LOWER(CONCAT('%', :interest, '%')))) " +
           "AND (CAST(:startDate AS timestamp) IS NULL OR i.submittedAt >= :startDate) " +
           "AND (CAST(:endDate AS timestamp) IS NULL OR i.submittedAt <= :endDate)")
    Page<FollowerInquiry> findWithFilters(
            @Param("read") Boolean read,
            @Param("interest") String interest,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            Pageable pageable);
}
