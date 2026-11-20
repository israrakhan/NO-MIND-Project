package com.organization.NoMindF.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Log4j2
@Entity
@Table(name = "FollowerInquiry")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FollowerInquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inquiryId;
    private String name;
    private String email;
    private String phone;
    private String interest;
    private String message;
    @Column(name = "isRead")
    private Boolean read =  false;
    @Column(name = "contacted")
    private Boolean contacted = false;
    private String replyMessage;

    @CreationTimestamp
    private LocalDateTime submittedAt;

}
