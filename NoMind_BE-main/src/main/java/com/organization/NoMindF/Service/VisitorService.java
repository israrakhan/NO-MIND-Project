package com.organization.NoMindF.Service;

import com.organization.NoMindF.Repository.VisitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class VisitorService {
    private final VisitorRepository visitorRepository;
    private final UniqueVisitorService uniqueVisitorService;

    public long getTotalVisits() {
        return visitorRepository.count();
    }

    public long getUniqueVisitors() {
        return visitorRepository.countDistinctByIp();
    }

    public long getTodayVisits() {
        return visitorRepository.countToday();
    }
    public long getTodayUnique() {
        return uniqueVisitorService.getTodayUniqueVisitors();
    }

}
