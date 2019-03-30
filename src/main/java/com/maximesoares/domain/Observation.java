package com.maximesoares.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Observation.
 */
@Entity
@Table(name = "observation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Observation implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "created_date", nullable = false)
    private LocalDate createdDate;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("observations")
    private User creator;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("observations")
    private Children children;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public Observation createdDate(LocalDate createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public String getDescription() {
        return description;
    }

    public Observation description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getCreator() {
        return creator;
    }

    public Observation creator(User user) {
        this.creator = user;
        return this;
    }

    public void setCreator(User user) {
        this.creator = user;
    }

    public Children getChildren() {
        return children;
    }

    public Observation children(Children children) {
        this.children = children;
        return this;
    }

    public void setChildren(Children children) {
        this.children = children;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Observation observation = (Observation) o;
        if (observation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), observation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Observation{" +
            "id=" + getId() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
