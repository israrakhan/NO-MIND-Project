package com.organization.NoMindF.Controller.Follower;

import com.organization.NoMindF.DTO.ApiResponseDTO;
import com.organization.NoMindF.Model.Experiences;
import com.organization.NoMindF.Service.ExperienceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RequestMapping("/api/v1/follower")
@Controller
@RequiredArgsConstructor
@Log4j2
public class FollowerExperienceController {

    private final ExperienceService experienceService;

    @GetMapping("/experience")
    public ResponseEntity<ApiResponseDTO<?>> getExperience(
        @RequestParam (required = false) Long expId,
        @RequestParam (defaultValue = "0") int page,
        @RequestParam (defaultValue = "10") int size
    ){
        try {
            log.info("API called : GET /follower/experience, expId={}, page={}, size={}",
                    expId, page, size);

            List<Experiences> experiences = experienceService.getExperience(expId,page,size);
            return ResponseEntity.status(HttpStatus.FOUND)
                    .body(new ApiResponseDTO<>(
                            true,
                            "Experiences Retried",
                            experiences
                    ));

        } catch (RuntimeException e) {
            log.error("Error in GET /follower/experience : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponseDTO<>(
                            false,
                            e.getMessage(),
                            null
                    ));
        }
    }

}
