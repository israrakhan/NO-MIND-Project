package com.organization.NoMindF.Service;

import com.organization.NoMindF.DTO.InquirieRequest;
import com.organization.NoMindF.Mapper.InquiryMapper;
import com.organization.NoMindF.Model.FollowerInquiry;
import com.organization.NoMindF.Repository.InquiryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final InquiryMapper inquiryMapper;

    public Page<FollowerInquiry> findInquiries(
            Long inquiryId,
            Boolean read,
            String interest,
            LocalDateTime startDate,
            LocalDateTime endDate,
            int page,
            int size
    ) {
        log.info("Inside InquiryService : findInquiries method, inquiryId={}, read={}, interest={}, dateRange={} to {}, page={}, size={}",
                inquiryId, read, interest, startDate, endDate, page, size);

        if (inquiryId != null) {
            FollowerInquiry inquiry = getInquiryById(inquiryId);
            return new org.springframework.data.domain.PageImpl<>(List.of(inquiry));
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(
                Sort.Order.asc("read"),
                Sort.Order.desc("submittedAt")));
        
        return inquiryRepository.findWithFilters(read, interest, startDate, endDate, pageable);
    }

    public long getTotalUsers() {
        log.info("Inside InquiryService : getTotalUsers method");
        long count = inquiryRepository.count();
        log.info("Total users registered: {}", count);
        return count;
    }

    @Transactional
    public FollowerInquiry createFollowerInquiry(InquirieRequest request) {
        log.info("Inside InquiryService : createFollowerInquiry method");

        FollowerInquiry followerInquiry = inquiryMapper.toFollowerInquiry(request);
        followerInquiry.setRead(false);
        followerInquiry.setContacted(false);

        FollowerInquiry savedInquiry = inquiryRepository.save(followerInquiry);

        log.info("Follower inquiry created successfully with ID: {}", savedInquiry.getInquiryId());
        return savedInquiry;
    }

    @Transactional
    public FollowerInquiry readReplyInquiry(
            Long inquiryId,
            String message
    ) {
        log.info("Inside InquiryService : readReplyInquiry method, inquiryId={}", inquiryId);

        FollowerInquiry inquiry = getInquiryById(inquiryId);

        inquiry.setRead(true);

        if (message != null) {
            inquiry.setContacted(true);
            inquiry.setReplyMessage(message);
        }

        FollowerInquiry updatedInquiry = inquiryRepository.save(inquiry);
        log.info("Inquiry updated successfully for inquiryId={}", inquiryId);

        return updatedInquiry;
    }

    @Transactional
    public void deleteInquiry(Long inquiryId) {
        log.info("Inside InquiryService : deleteInquiry method, inquiryId={}", inquiryId);

        FollowerInquiry inquiry = getInquiryById(inquiryId);
        inquiryRepository.delete(inquiry);

        log.info("Inquiry deleted successfully for inquiryId={}", inquiryId);
    }

    @Transactional
    public void bulkMarkAsRead(List<Long> inquiryIds) {
        log.info("Inside InquiryService : bulkMarkAsRead method");
        inquiryRepository.markAsReadByIds(inquiryIds);
    }

    @Transactional
    public void bulkDeleteInquiries(List<Long> inquiryIds) {
        log.info("Inside InquiryService : bulkDeleteInquiries method");
        inquiryRepository.deleteAllById(inquiryIds);
        log.info("Bulk inquiries deleted successfully");
    }

    private FollowerInquiry getInquiryById(Long inquiryId) {
        return inquiryRepository.findById(inquiryId)
                .orElseThrow(() ->
                        new RuntimeException("Inquiry not found by inquiryId: " + inquiryId));
    }
}