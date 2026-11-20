package com.organization.NoMindF.Controller.Follower;


import com.organization.NoMindF.DTO.ApiResponseDTO;
import com.organization.NoMindF.DTO.InquirieRequest;
import com.organization.NoMindF.Service.InquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RequestMapping("/api/v1/follower")
@RestController
@RequiredArgsConstructor
public class FollowersInquiryController {
    private final InquiryService inquiryService;


    @PostMapping("/inquiries")
    public ResponseEntity<ApiResponseDTO<?>> saveInquiry(
           @Valid @RequestBody InquirieRequest request
    ){

        try{

            log.info("API called:/ follower/inquiries");
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponseDTO<>(
                            true,
                            "Submitted Inquiry",
                            inquiryService.createFollowerInquiry(request)
                    ));


        }catch (RuntimeException ex) {
            log.error("ERROR IN /follower/inquiries : {}", ex.getMessage() );
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponseDTO<>(
                            false,
                            ex.getMessage(),
                            null
                    ));

        }

    }


}
/*
 * here we can use field like contacted(yes/no)
 *    if (yes) then when--> if more than two days before then he can create again
 *   else(No) wait till get contacted
 *
 * on admin side we have to add that whether we contacted or not */
