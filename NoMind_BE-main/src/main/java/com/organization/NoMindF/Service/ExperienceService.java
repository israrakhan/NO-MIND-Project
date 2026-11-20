package com.organization.NoMindF.Service;

import com.organization.NoMindF.DTO.ExperienceRequestDTO;
import com.organization.NoMindF.Mapper.ExperienceMapper;
import com.organization.NoMindF.Model.Experiences;
import com.organization.NoMindF.Repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class ExperienceService {

    private final ExperienceRepository experienceRepository;
    private final ExperienceMapper experienceMapper;

    public Experiences createExperience(ExperienceRequestDTO request) {

       log.info("Inside ExperienceService : createExperience Method");
       if (request.getDisplayOrder() != null && experienceRepository.existsByDisplayOrder(request.getDisplayOrder())) {
           throw new RuntimeException("Display order is already taken by another milestone.");
       }
        Experiences experiences = experienceMapper.toExperiences(request);
        return experienceRepository.save(experiences);
    }

    public void deleteExperience(Long expId) {

        log.info("Inside ExperienceService : deleteExperience Method");
        Experiences experiences = getById(expId);
        experienceRepository.delete(experiences);
        log.info("Experience deleted successfully for expId={}", expId);

    }

    public List<Experiences> getExperience(
            Long expId,
            int page,
            int size
    ) {
        log.info("Inside ExperienceService : getExperience method, expId={}, page={}, size={}",
                expId, page, size);

        if (expId != null) {
            Experiences experience = getById(expId);
            return List.of(experience);
        }

        Pageable pageable = PageRequest.of(page, size);
        Page<Experiences> experiencesPage = experienceRepository.findAll(pageable);
        return experiencesPage.getContent();
    }

    public Experiences updateExperience(
            Long expId,
            ExperienceRequestDTO request
    ) {

        Experiences experience = getById(expId);
        
        if (request.getDisplayOrder() != null && !request.getDisplayOrder().equals(experience.getDisplayOrder())) {
            if (experienceRepository.existsByDisplayOrder(request.getDisplayOrder())) {
                throw new RuntimeException("Display order is already taken by another milestone.");
            }
        }
        
        experienceMapper.updateEntityFromDTO(request, experience);
        return experienceRepository.save(experience);
    }

    private Experiences getById(
            Long expId
    ){
        return experienceRepository.findById(expId)
                .orElseThrow(()->new RuntimeException("Experience does not Exist By expId " + expId));
    }
}
