package com.mouhamadougaye.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "post_views")
public class PostView {
    @Id @Column(length = 160) private String slug;
    @Column(nullable = false) private int views;

    protected PostView() {}
    public String getSlug() { return slug; }
    public int getViews() { return views; }
}
