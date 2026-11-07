package com.mouhamadougaye.portfolio.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "contacts")
public class Contact {
    @Id @Column(length = 40) private String id;
    @Column(length = 120, nullable = false) private String name;
    @Column(length = 200, nullable = false) private String email;
    @Column(length = 160) private String company = "";
    @Column(columnDefinition = "text", nullable = false) private String message;
    @Column(name = "created_at", nullable = false) private Instant createdAt = Instant.now();

    protected Contact() {}

    public Contact(String id, String name, String email, String company, String message) {
        this.id = id; this.name = name; this.email = email;
        this.company = company == null ? "" : company; this.message = message;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getCompany() { return company; }
    public String getMessage() { return message; }
    public Instant getCreatedAt() { return createdAt; }
}
