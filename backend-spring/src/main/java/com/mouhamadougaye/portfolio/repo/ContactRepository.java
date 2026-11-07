package com.mouhamadougaye.portfolio.repo;

import com.mouhamadougaye.portfolio.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, String> {}
