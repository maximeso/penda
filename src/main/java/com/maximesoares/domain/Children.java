package com.maximesoares.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Children.
 */
@Entity
@Table(name = "children")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Children implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "children")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Observation> observations = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "children_tutors",
               joinColumns = @JoinColumn(name = "children_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tutors_id", referencedColumnName = "id"))
    @JsonIgnoreProperties("childrens")
    private Set<User> tutors = new HashSet<>();

    @ManyToMany(mappedBy = "childrens")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<ChildrenGroup> childrenGroups = new HashSet<>();

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

    public Children name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Observation> getObservations() {
        return observations;
    }

    public Children observations(Set<Observation> observations) {
        this.observations = observations;
        return this;
    }

    public Children addObservations(Observation observation) {
        this.observations.add(observation);
        observation.setChildren(this);
        return this;
    }

    public Children removeObservations(Observation observation) {
        this.observations.remove(observation);
        observation.setChildren(null);
        return this;
    }

    public void setObservations(Set<Observation> observations) {
        this.observations = observations;
    }

    public Set<User> getTutors() {
        return tutors;
    }

    public Children tutors(Set<User> users) {
        this.tutors = users;
        return this;
    }

    public Children addTutors(User user) {
        this.tutors.add(user);
        return this;
    }

    public Children removeTutors(User user) {
        this.tutors.remove(user);
        return this;
    }

    public void setTutors(Set<User> users) {
        this.tutors = users;
    }

    public Set<ChildrenGroup> getChildrenGroups() {
        return childrenGroups;
    }

    public Children childrenGroups(Set<ChildrenGroup> childrenGroups) {
        this.childrenGroups = childrenGroups;
        return this;
    }

    public Children addChildrenGroup(ChildrenGroup childrenGroup) {
        this.childrenGroups.add(childrenGroup);
        childrenGroup.getChildrens().add(this);
        return this;
    }

    public Children removeChildrenGroup(ChildrenGroup childrenGroup) {
        this.childrenGroups.remove(childrenGroup);
        childrenGroup.getChildrens().remove(this);
        return this;
    }

    public void setChildrenGroups(Set<ChildrenGroup> childrenGroups) {
        this.childrenGroups = childrenGroups;
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
        Children children = (Children) o;
        if (children.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), children.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Children{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
