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
 * A MessageGroup.
 */
@Entity
@Table(name = "message_group")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MessageGroup implements Serializable {

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

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("messageGroups")
    private User creator;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("messageGroups")
    private ChildrenGroup childrenGroup;

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

    public MessageGroup createdDate(LocalDate createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public String getMessage() {
        return message;
    }

    public MessageGroup message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getCreator() {
        return creator;
    }

    public MessageGroup creator(User user) {
        this.creator = user;
        return this;
    }

    public void setCreator(User user) {
        this.creator = user;
    }

    public ChildrenGroup getChildrenGroup() {
        return childrenGroup;
    }

    public MessageGroup childrenGroup(ChildrenGroup childrenGroup) {
        this.childrenGroup = childrenGroup;
        return this;
    }

    public void setChildrenGroup(ChildrenGroup childrenGroup) {
        this.childrenGroup = childrenGroup;
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
        MessageGroup messageGroup = (MessageGroup) o;
        if (messageGroup.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), messageGroup.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MessageGroup{" +
            "id=" + getId() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", message='" + getMessage() + "'" +
            "}";
    }
}
