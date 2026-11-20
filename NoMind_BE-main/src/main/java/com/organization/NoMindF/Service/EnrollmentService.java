package com.organization.NoMindF.Service;

import com.organization.NoMindF.DTO.*;
import com.organization.NoMindF.Mapper.EnrollmentMapper;
import com.organization.NoMindF.Model.Enrollment;
import com.organization.NoMindF.Repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentMapper enrollmentMapper;

    private final EnrollmentRepository repository;

    public void create(EnrollmentRequestDTO dto) {

        // 1. Check if email is already enrolled in this specific program
        if (repository.existsByEmailAndProgramId(dto.getEmail(), dto.getProgramId())) {
            throw new RuntimeException("You have already enrolled in this program with this email address.");
        }

        // 2. Check if phone is already enrolled in this specific program
        if (repository.existsByPhoneAndProgramId(dto.getPhone(), dto.getProgramId())) {
            throw new RuntimeException("This phone number is already registered for this program.");
        }

        Enrollment enrollment = enrollmentMapper.toEnrollment(dto);
        try {repository.save(enrollment);}
        catch (RuntimeException e) {
            throw new RuntimeException("Enrollment with same phone and email Id already exists");
        }
    }

    public Page<Enrollment> getAll(String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").descending());

        if (status != null && !status.isBlank()){
            return repository.findByStatusOrderByDateDesc(status,pageable);
        }
        return repository.findAll(pageable);

    }

    public Enrollment getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Enrollment updateStatus(Long id, String status) {
        Enrollment e = getById(id);
        e.setStatus(status);
        return repository.save(e);
    }

    public Enrollment updateNotes(Long id, String notes) {
        Enrollment e = getById(id);
        e.setNotes(notes);
        return repository.save(e);
    }
    public boolean delete(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}