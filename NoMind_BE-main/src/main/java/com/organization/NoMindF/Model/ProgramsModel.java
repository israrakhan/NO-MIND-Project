package com.organization.NoMindF.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProgramsModel {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;
    private String title;
    private String icon;
    private String duration;
    private String level;
    private LocalDate date;
    private String location;
    private String description;
    @Enumerated(EnumType.STRING)
    private ProgramStatus eventStatus;

    @Column(name = "image_url")
    private String image;

    @ElementCollection
    @CollectionTable(name = "program_highlights", joinColumns = @JoinColumn(name = "program_id"))
    @Column(name = "highlights")
    @BatchSize(size = 20)
    private List<String> highlights;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
