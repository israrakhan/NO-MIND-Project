package com.organization.NoMindF.Repository;

import com.organization.NoMindF.Model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    RefreshToken findByToken(String token);
    void deleteByPhone(String phone);
}
