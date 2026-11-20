package com.organization.NoMindF.Security;

import com.organization.NoMindF.Model.RefreshToken;
import com.organization.NoMindF.Repository.RefreshTokenRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@Transactional
public class RefreshTokenService
{
    @Autowired
    RefreshTokenRepository refreshTokenRepo;

    public RefreshToken createRefreshToken(String phone, String userType)
    {
        {
            refreshTokenRepo.deleteByPhone(phone);
            RefreshToken refreshToken = new RefreshToken();
            refreshToken.setToken(java.util.UUID.randomUUID().toString());
            refreshToken.setPhone(phone);
            refreshToken.setUserType(userType);
            refreshToken.setIssuedAt(java.time.Instant.now());
            refreshToken.setExpiresAt(Instant.now().plus(30, ChronoUnit.DAYS));
            refreshToken.setRevoked(false);
            return refreshTokenRepo.save(refreshToken);

        }
    }
    public RefreshToken verifyExpiration(RefreshToken token)
    {
        if(token.getExpiresAt().isBefore(Instant.now()))
        {
            refreshTokenRepo.delete(token);
            throw new RuntimeException("Refresh Token Expired");
        }
        return token;
    }

//    public void deleteByToken(String token) {
//        refreshTokenRepo.findByToken(token)
//                .ifPresent(refreshTokenRepo::delete);
//    }
}
