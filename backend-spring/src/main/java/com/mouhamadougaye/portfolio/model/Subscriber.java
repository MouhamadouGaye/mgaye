package com.mouhamadougaye.portfolio.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "subscribers")
public class Subscriber {
    @Id @Column(length = 200) private String email;
    @Column(name = "created_at", nullable = false) private Instant createdAt = Instant.now();

    protected Subscriber() {}
    public Subscriber(String email) { this.email = email; }
    public String getEmail() { return email; }
    public Instant getCreatedAt() { return createdAt; }
}
