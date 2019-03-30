package com.maximesoares.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ChildrenGroup.
 */
@Entity
@Table(name = "children_group")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ChildrenGroup implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToOne
    @JoinColumn(unique = true)
    private User responsable;

    @OneToMany(mappedBy = "childrenGroup")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MessageGroup> messageGroups = new HashSet<>();
    @OneToMany(mappedBy = "childrenGroup")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EventGroup> eventGroups = new HashSet<>();
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "children_group_childrens",
               joinColumns = @JoinColumn(name = "children_group_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "childrens_id", referencedColumnName = "id"))
    private Set<Children> childrens = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ChildrenGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getResponsable() {
        return responsable;
    }

    public ChildrenGroup responsable(User user) {
        this.responsable = user;
        return this;
    }

    public void setResponsable(User user) {
        this.responsable = user;
    }

    public Set<MessageGroup> getMessageGroups() {
        return messageGroups;
    }

    public ChildrenGroup messageGroups(Set<MessageGroup> messageGroups) {
        this.messageGroups = messageGroups;
        return this;
    }

    public ChildrenGroup addMessageGroups(MessageGroup messageGroup) {
        this.messageGroups.add(messageGroup);
        messageGroup.setChildrenGroup(this);
        return this;
    }

    public ChildrenGroup removeMessageGroups(MessageGroup messageGroup) {
        this.messageGroups.remove(messageGroup);
        messageGroup.setChildrenGroup(null);
        return this;
    }

    public void setMessageGroups(Set<MessageGroup> messageGroups) {
        this.messageGroups = messageGroups;
    }

    public Set<EventGroup> getEventGroups() {
        return eventGroups;
    }

    public ChildrenGroup eventGroups(Set<EventGroup> eventGroups) {
        this.eventGroups = eventGroups;
        return this;
    }

    public ChildrenGroup addEventGroups(EventGroup eventGroup) {
        this.eventGroups.add(eventGroup);
        eventGroup.setChildrenGroup(this);
        return this;
    }

    public ChildrenGroup removeEventGroups(EventGroup eventGroup) {
        this.eventGroups.remove(eventGroup);
        eventGroup.setChildrenGroup(null);
        return this;
    }

    public void setEventGroups(Set<EventGroup> eventGroups) {
        this.eventGroups = eventGroups;
    }

    public Set<Children> getChildrens() {
        return childrens;
    }

    public ChildrenGroup childrens(Set<Children> children) {
        this.childrens = children;
        return this;
    }

    public ChildrenGroup addChildrens(Children children) {
        this.childrens.add(children);
        children.getChildrenGroups().add(this);
        return this;
    }

    public ChildrenGroup removeChildrens(Children children) {
        this.childrens.remove(children);
        children.getChildrenGroups().remove(this);
        return this;
    }

    public void setChildrens(Set<Children> children) {
        this.childrens = children;
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
        ChildrenGroup childrenGroup = (ChildrenGroup) o;
        if (childrenGroup.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), childrenGroup.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChildrenGroup{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
