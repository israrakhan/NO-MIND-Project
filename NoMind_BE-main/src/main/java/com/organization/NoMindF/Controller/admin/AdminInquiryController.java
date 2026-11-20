package com.organization.NoMindF.Controller.admin;

import com.organization.NoMindF.DTO.ApiResponseDTO;
import com.organization.NoMindF.Model.FollowerInquiry;
import com.organization.NoMindF.Service.InquiryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminInquiryController {

    private final InquiryService inquiryService;

    @GetMapping("/inquiries")
    public ResponseEntity<ApiResponseDTO<Page<FollowerInquiry>>> getInquiries(
            @RequestParam(required = false) Long inquiryId,
            @RequestParam(required = false) Boolean read,
            @RequestParam(required = false) String interest,
            @RequestParam(required = false) String date,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        try {
            log.info("API called : GET /admin/inquiries, inquiryId={}, read={}, interest={}, date={}, page={}, size={}",
                    inquiryId, read, interest, date, page, size);

            java.time.LocalDateTime startDate = null;
            java.time.LocalDateTime endDate = null;
            
            if (date != null && !date.trim().isEmpty()) {
                try {
                    java.time.LocalDate parsedDate = java.time.LocalDate.parse(date);
                    startDate = parsedDate.atStartOfDay();
                    endDate = parsedDate.atTime(java.time.LocalTime.MAX);
                } catch (Exception e) {
                    log.warn("Invalid date format received: {}", date);
                }
            }

            Page<FollowerInquiry> inquiries = inquiryService.findInquiries(inquiryId, read, interest, startDate, endDate, page, size);

            return ResponseEntity.ok(
                    new ApiResponseDTO<>(
                            true,
                            "Inquiries retrieved successfully",
                            inquiries
                    )
            );

        } catch (RuntimeException ex) {
            log.error("Error in GET /admin/inquiries : {}", ex.getMessage());

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponseDTO<>(
                            false,
                            ex.getMessage(),
                            null
                    ));
        }
    }

    @PutMapping("/inquiries/{inquiryId}")
    public ResponseEntity<ApiResponseDTO<?>> readReplyInquiries(
            @PathVariable Long inquiryId,
            @RequestParam(required = false) String message
    ) {
        try {
            log.info("API called : PUT /admin/inquiries/{}", inquiryId);

            FollowerInquiry updatedInquiry = inquiryService.readReplyInquiry(inquiryId, message);

            return ResponseEntity.ok(
                    new ApiResponseDTO<>(
                            true,
                            "Inquiry updated successfully",
                            updatedInquiry
                    )
            );

        } catch (RuntimeException ex) {
            log.error("Error in PUT /admin/inquiries/{} : {}", inquiryId, ex.getMessage());

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponseDTO<>(
                            false,
                            ex.getMessage(),
                            null
                    ));
        }
    }

    @DeleteMapping("/inquiries/{inquiryId}")
    public ResponseEntity<ApiResponseDTO<?>> deleteInquiry(
            @PathVariable Long inquiryId
    ) {
        try {
            log.info("API called : DELETE /admin/inquiries/{}", inquiryId);

            inquiryService.deleteInquiry(inquiryId);

            return ResponseEntity.ok(
                    new ApiResponseDTO<>(
                            true,
                            "Inquiry deleted successfully",
                            null
                    )
            );

        } catch (RuntimeException ex) {
            log.error("Error in DELETE /admin/inquiries/{} : {}", inquiryId, ex.getMessage());

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponseDTO<>(
                            false,
                            ex.getMessage(),
                            null
                    ));
        }
    }

    @PutMapping("/inquiries/bulk/read")
    public ResponseEntity<ApiResponseDTO<?>> bulkMarkAsRead(@RequestBody List<Long> inquiryIds) {
        try {
            log.info("API called : PUT /admin/inquiries/bulk/read");
            inquiryService.bulkMarkAsRead(inquiryIds);
            return ResponseEntity.ok(
                    new ApiResponseDTO<>(
                            true,
                            "Inquiries marked as read successfully",
                            null
                    )
            );
        } catch (RuntimeException ex) {
            log.error("Error in PUT /admin/inquiries/bulk/read : {}", ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponseDTO<>(
                            false,
                            ex.getMessage(),
                            null
                    ));
        }
    }

    @DeleteMapping("/inquiries/bulk")
    public ResponseEntity<ApiResponseDTO<?>> bulkDelete(@RequestBody List<Long> inquiryIds) {
        try {
            log.info("API called : DELETE /admin/inquiries/bulk");
            inquiryService.bulkDeleteInquiries(inquiryIds);
            return ResponseEntity.ok(
                    new ApiResponseDTO<>(
                            true,
                            "Inquiries deleted successfully",
                            null
                    )
            );
        } catch (RuntimeException ex) {
            log.error("Error in DELETE /admin/inquiries/bulk : {}", ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponseDTO<>(
                            false,
                            ex.getMessage(),
                            null
                    ));
        }
    }
}