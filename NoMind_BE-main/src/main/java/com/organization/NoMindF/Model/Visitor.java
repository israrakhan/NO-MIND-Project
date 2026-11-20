package com.organization.NoMindF.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "visitors")
@Data
public class Visitor {

    private int isUnique = 0;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String ipAddress;

    @Column
    private String pageUrl;

    @Column(nullable = false)
    private LocalDateTime visitTime;

    // Constructors
    public Visitor() {
        this.visitTime = LocalDateTime.now();
    }

    public Visitor(String ipAddress, String pageUrl) {
        this.ipAddress = ipAddress;
        this.pageUrl = pageUrl;
        this.visitTime = LocalDateTime.now();
    }


}
