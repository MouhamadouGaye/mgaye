package com.mouhamadougaye.portfolio.repo;

import com.mouhamadougaye.portfolio.model.PostView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PostViewRepository extends JpaRepository<PostView, String> {

    // Incrément atomique (upsert PostgreSQL), sans conflit entre requêtes simultanées
    @Modifying
    @Transactional
    @Query(value = """
        INSERT INTO post_views (slug, views) VALUES (:slug, 1)
        ON CONFLICT (slug) DO UPDATE SET views = post_views.views + 1
        """, nativeQuery = true)
    void increment(@Param("slug") String slug);
}
