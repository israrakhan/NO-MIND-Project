package com.organization.NoMindF.Service;

import com.organization.NoMindF.DTO.AdminProgramsDTO;
import com.organization.NoMindF.Mapper.ProgramsMapper;
import com.organization.NoMindF.Model.Enrollment;
import com.organization.NoMindF.Model.ProgramStatus;
import com.organization.NoMindF.Model.ProgramStatus;
import com.organization.NoMindF.Model.ProgramsModel;
import com.organization.NoMindF.Repository.EnrollmentRepository;
import com.organization.NoMindF.Repository.ProgramsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@Log4j2
@RequiredArgsConstructor
public class AdminProgramsService {
    private final ProgramsRepository programsRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final ProgramsMapper programsMapper;

    public Page<AdminProgramsDTO> getProgramsList(
            Long id,
            int page,
            int size
    ){

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        log.info("AdminEventsService.getEventList() - START | eventId={}", id);
        if(id != null){
            ProgramsModel event = programsRepository.findById(id)
                    .orElseThrow(()->new RuntimeException("Event Not found with Id: "+id));
            log.info("AdminEventsService.getEventList() - Found event with id={}", id);
            List<AdminProgramsDTO> list = List.of(programsMapper.toAdminProgramsDTO(event));
            return new PageImpl<>(list, pageable, 1);
        }

        Page<ProgramsModel> programs = programsRepository.findAll(pageable);
        log.info("AdminEventsService.getEventList() - Retrieved {} events", programs.getTotalElements());
        return programs.map(programsMapper::toAdminProgramsDTO);
    }

    public AdminProgramsDTO createUpdateEvent(ProgramsModel program, MultipartFile imageFile) throws IOException {
        log.info("AdminEventsService.createUpdateEvent() - START | eventId={}, hasImage={}", program.getId(), imageFile != null && !imageFile.isEmpty());

        if(program.getId() != 0){
            log.info("AdminEventsService.createUpdateEvent() - Updating event with id={}", program.getId());

            ProgramsModel existingProgram = programsRepository.findById(program.getId())
                    .orElseThrow(() -> {
                        log.error("AdminEventsService.createUpdateEvent() - Event not found with id={}", program.getId());
                        return new IllegalStateException("No Event found with Event ID");
                    });

            // Handle image upload if user provided new image
            if(imageFile != null && !imageFile.isEmpty()){
                // Delete old image if exists
                if(existingProgram.getImage() != null && !existingProgram.getImage().isEmpty()){
                    deleteEventImage(existingProgram.getImage());
                    log.info("AdminEventsService.createUpdateEvent() - Deleted old image: {}", existingProgram.getImage());
                }

                // Save new image
                String imageUrl = saveProgramImage(imageFile);
                existingProgram.setImage(imageUrl);
                log.info("AdminEventsService.createUpdateEvent() - New image saved at: {}", imageUrl);
            }


            if (!program.getDate().isAfter(LocalDate.now())) {
                throw new RuntimeException("Date must be in future");
            }


            // If no new image provided, keep the existing image (do nothing)

            // Update other fields using mapper
            programsMapper.updateProgramFromModel(program, existingProgram);

            log.info("AdminEventsService.createUpdateEvent() - Event updated successfully with id={}", program.getId());
            ProgramsModel saved = programsRepository.save(existingProgram);
            return programsMapper.toAdminProgramsDTO(saved);
        }

        if (!program.getDate().isAfter(LocalDate.now())) {
            throw new RuntimeException("Date must be in future");
        }

        // Creating new event
        log.info("AdminEventsService.createUpdateEvent() - Creating new event");
        program.setEventStatus(ProgramStatus.ACTIVE);

        // Handle image upload for new event
        if(imageFile != null && !imageFile.isEmpty()){
            String imageUrl = saveProgramImage(imageFile);
            program.setImage(imageUrl);
            log.info("AdminEventsService.createUpdateEvent() - Image saved at: {}", imageUrl);
        }

        if(program.getDate().isBefore(LocalDate.now()) && program.getDate().isEqual(LocalDate.now())){
            throw new RuntimeException("Date must be Future");
        }

        ProgramsModel savedProgram = programsRepository.save(program);
        log.info("AdminEventsService.createUpdateEvent() - Event created with id={}", savedProgram.getId());
        return programsMapper.toAdminProgramsDTO(savedProgram);
    }

    private String saveProgramImage(MultipartFile file) throws IOException{

        //Checking if File is present
        if(file.isEmpty()){
            throw new IllegalStateException("Cannot upload empty file");
        }

        //Validating the Type of the File
        String contentType = file.getContentType();
        if(contentType==null || !contentType.startsWith("image/")){
            throw new IllegalStateException("Only allowed to upload Image as a File");
        }

        //Creating upload directory if not exists
        String uploadDir = "uploads/programs";
        Path directory = Paths.get(uploadDir);
        if(!Files.exists(directory)){
            Files.createDirectories(directory);
            log.info("AdminEventsService.saveEventImage() - Created upload directory: {}", uploadDir);
        }

        // Generate unique filename with timestamp
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename != null && originalFilename.contains(".")
                ? originalFilename.substring(originalFilename.lastIndexOf("."))
                : ".jpg";

        String uniqueFilename = System.currentTimeMillis() + "_" + UUID.randomUUID() + fileExtension;
        String filePath = uploadDir + "/" + uniqueFilename;

        //Save File
        Path path = Paths.get(filePath);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        // Return as URL path (starts with /) so frontend can prepend the API base URL
        String urlPath = "/uploads/programs/" + uniqueFilename;
        log.info("AdminEventsService.saveEventImage() - Image saved successfully at: {} (URL: {})", filePath, urlPath);
        return urlPath;
    }

    private void deleteEventImage(String imageUrl){
        try{
            if(imageUrl != null && !imageUrl.isEmpty()){
                // imageUrl is like "/uploads/programs/filename.jpg" — strip leading slash for relative path
                String relativePath = imageUrl.startsWith("/") ? imageUrl.substring(1) : imageUrl;
                Path path = Paths.get(relativePath);
                Files.deleteIfExists(path);
                log.info("AdminEventsService.deleteEventImage() - Deleted image: {}", imageUrl);
            }
        }catch (IOException e){
            log.warn("AdminEventsService.deleteEventImage() - Failed to delete image: {}", e.getMessage());
        }
    }

    public void deleteProgram(Long id) {
        log.info("AdminProgramsService.deleteProgram() - START | programId={}", id);
        if(id != null){
            ProgramsModel existingProgram = programsRepository.findById(id)
                    .orElseThrow(() -> {
                        log.error("AdminProgramsService.deleteProgram() - Program not found with id={}", id);
                        return new RuntimeException("Program not found with id: " + id);
                    });

            // Delete associated image if exists
            if(existingProgram.getImage() != null && !existingProgram.getImage().isEmpty()){
                deleteEventImage(existingProgram.getImage());
                log.info("AdminProgramsService.deleteProgram() - Deleted image for programId={}", id);
            }

            programsRepository.deleteById(id);
            log.info("AdminProgramsService.deleteProgram() - Program deleted successfully with id={}", id);
        }else{
            log.error("AdminProgramsService.deleteProgram() - Program id is null");
            throw new RuntimeException("Program id must not be null");
        }
    }

    public Page<Enrollment> getEnrollmentList(Long programId, int page, int size) {
        log.info("AdminProgramsService.getEnrollmentList - START | programId = {}", programId);
        programsRepository.findById(programId)
                .orElseThrow(()->new RuntimeException("Program Does not Exist by Id = " + programId));

        Pageable pageable = PageRequest.of(page,size,Sort.by("date").descending());
        Page<Enrollment> enrollmentPage = enrollmentRepository.findByProgramId(programId,pageable);
        if(enrollmentPage.isEmpty())
            throw new RuntimeException("No data found");
        log.info("AdminProgramsService.getEnrollmentList() - Enrollment List retried successfully with id = {}", programId);
        return enrollmentPage;
    }
    public void deactivateExpiredPrograms() {

        List<ProgramsModel> programs = programsRepository.findAll();

        for (ProgramsModel program : programs) {

            if (program.getDate() != null &&
                    program.getDate().isBefore(LocalDate.now()) &&
                    program.getEventStatus() == ProgramStatus.ACTIVE) {

                program.setEventStatus(ProgramStatus.INACTIVE);
                programsRepository.save(program);
            }
        }
    }
    @Scheduled(cron = "0 */1 * * * ?") // every day at midnight
    public void autoDeactivatePrograms() {
        deactivateExpiredPrograms();
    }
    public Page<AdminProgramsDTO> getActivePrograms(int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<ProgramsModel> programs =
                programsRepository.findByEventStatus(ProgramStatus.ACTIVE, pageable);

        return programs.map(programsMapper::toAdminProgramsDTO);
    }

}
