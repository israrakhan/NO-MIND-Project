package com.organization.NoMindF.Repository;

import com.organization.NoMindF.Model.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VisitorRepository extends JpaRepository<Visitor,Long> {
    long count();  // Total visits

    @Query("SELECT COUNT(DISTINCT v.ipAddress) FROM Visitor v")
    long countDistinctByIp();  // Unique visitors

    // Optional: Today's visits
    @Query("SELECT COUNT(v) FROM Visitor v WHERE DATE(v.visitTime) = CURRENT_DATE")
    long countToday();
}
