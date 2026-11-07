package com.mouhamadougaye.portfolio.web;

import com.mouhamadougaye.portfolio.model.Contact;
import com.mouhamadougaye.portfolio.model.PostView;
import com.mouhamadougaye.portfolio.model.Subscriber;
import com.mouhamadougaye.portfolio.repo.ContactRepository;
import com.mouhamadougaye.portfolio.repo.PostViewRepository;
import com.mouhamadougaye.portfolio.repo.SubscriberRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/** Même contrat d'API que le backend FastAPI : le front n'a qu'à changer API_URL. */
@RestController
public class ApiController {

    public record ContactIn(
        @NotBlank @Size(max = 40) String id,
        @NotBlank @Size(max = 120) String name,
        @NotBlank @Email @Size(max = 200) String email,
        @Size(max = 160) String company,
        @NotBlank @Size(min = 10, max = 5000) String message) {}

    public record NewsletterIn(@NotBlank @Email @Size(max = 200) String email) {}

    private final ContactRepository contacts;
    private final SubscriberRepository subscribers;
    private final PostViewRepository views;

    public ApiController(ContactRepository contacts, SubscriberRepository subscribers, PostViewRepository views) {
        this.contacts = contacts; this.subscribers = subscribers; this.views = views;
    }

    @GetMapping("/health")
    public Map<String, String> health() { return Map.of("status", "ok"); }

    @PostMapping("/contacts")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Boolean> createContact(@Valid @RequestBody ContactIn in) {
        contacts.save(new Contact(in.id(), in.name(), in.email(), in.company(), in.message()));
        return Map.of("ok", true);
    }

    @PostMapping("/newsletter")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Boolean> subscribe(@Valid @RequestBody NewsletterIn in) {
        if (!subscribers.existsById(in.email())) subscribers.save(new Subscriber(in.email()));
        return Map.of("ok", true);
    }

    @PostMapping("/posts/{slug}/view")
    public Map<String, Object> addView(@PathVariable String slug) {
        views.increment(slug);
        return Map.of("slug", slug, "views", currentViews(slug));
    }

    @GetMapping("/posts/{slug}/views")
    public Map<String, Object> getViews(@PathVariable String slug) {
        return Map.of("slug", slug, "views", currentViews(slug));
    }

    private int currentViews(String slug) {
        return views.findById(slug).map(PostView::getViews).orElse(0);
    }
}
