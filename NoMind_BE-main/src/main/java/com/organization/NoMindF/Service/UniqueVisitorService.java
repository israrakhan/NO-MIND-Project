package com.organization.NoMindF.Service;

import com.organization.NoMindF.Model.Visitor;
import com.organization.NoMindF.Repository.VisitorRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Component  // For @Scheduled
@RequiredArgsConstructor
public class UniqueVisitorService {

    private final VisitorRepository visitorRepository;  // Reuse existing

    private final Set<String> todayVisitors = ConcurrentHashMap.newKeySet();  // In-memory unique IPs/cookies TODAY

    // Check if first visit today, set cookie if new
    public boolean isNewVisitor(HttpServletRequest request, HttpServletResponse response) {
        String visitorId = getVisitorCookie(request);
        String todayKey = visitorId + "_" + LocalDate.now();  // IP_cookie_2026-03-07

        if (!todayVisitors.contains(todayKey)) {
            todayVisitors.add(todayKey);
            // Save to DB for persistence
            visitorRepository.save(new Visitor(visitorId, "website"));
            if (visitorId == null) {  // New device
                setVisitorCookie(response, generateVisitorId());
            }
            return true;  // Count +1
        }
        return false;  // Already counted today
    }

    private String getVisitorCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("visitor_id".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return request.getRemoteAddr();  // Fallback IP
    }

    private void setVisitorCookie(HttpServletResponse response, String id) {
        Cookie cookie = new Cookie("visitor_id", id);
        cookie.setMaxAge(365 * 24 * 60 * 60);  // 1 year
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }

    private String generateVisitorId() {
        return UUID.randomUUID().toString();
    }

    // Reset daily at midnight
    @Scheduled(cron = "0 0 0 * * ?")
    public void resetDaily() {
        todayVisitors.clear();
    }

    public long getTodayUniqueVisitors() {
        return todayVisitors.size();
    }
}

