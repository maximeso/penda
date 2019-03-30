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
 * A MessageUser.
 */
@Entity
@Table(name = "message_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MessageUser implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "created_date", nullable = false)
    private LocalDate createdDate;

    @NotNull
    @Column(name = "message", nullable = false)
    private String message;

    @ManyToOne
    @JsonIgnoreProperties("messageUsers")
    private User from;

    @ManyToOne
    @JsonIgnoreProperties("messageUsers")
    private User to;

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

    public MessageUser createdDate(LocalDate createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public String getMessage() {
        return message;
    }

    public MessageUser message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getFrom() {
        return from;
    }

    public MessageUser from(User user) {
        this.from = user;
        return this;
    }

    public void setFrom(User user) {
        this.from = user;
    }

    public User getTo() {
        return to;
    }

    public MessageUser to(User user) {
        this.to = user;
        return this;
    }

    public void setTo(User user) {
        this.to = user;
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
        MessageUser messageUser = (MessageUser) o;
        if (messageUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), messageUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MessageUser{" +
            "id=" + getId() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", message='" + getMessage() + "'" +
            "}";
    }
}
