package com.maximesoares.service;

import com.maximesoares.domain.Children;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Children.
 */
public interface ChildrenService {

    /**
     * Save a children.
     *
     * @param children the entity to save
     * @return the persisted entity
     */
    Children save(Children children);

    /**
     * Get all the children.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Children> findAll(Pageable pageable);

    /**
     * Get all the Children with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<Children> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" children.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Children> findOne(Long id);

    /**
     * Delete the "id" children.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
