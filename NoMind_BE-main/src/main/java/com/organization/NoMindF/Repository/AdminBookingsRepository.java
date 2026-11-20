package com.organization.NoMindF.Repository;

import com.organization.NoMindF.Model.BookingsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminBookingsRepository extends JpaRepository<BookingsModel,Integer> {
}
