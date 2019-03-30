package com.maximesoares.service;

import com.maximesoares.domain.ChildrenGroup;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing ChildrenGroup.
 */
public interface ChildrenGroupService {

    /**
     * Save a childrenGroup.
     *
     * @param childrenGroup the entity to save
     * @return the persisted entity
     */
    ChildrenGroup save(ChildrenGroup childrenGroup);

    /**
     * Get all the childrenGroups.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ChildrenGroup> findAll(Pageable pageable);

    /**
     * Get all the ChildrenGroup with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<ChildrenGroup> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" childrenGroup.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ChildrenGroup> findOne(Long id);

    /**
     * Delete the "id" childrenGroup.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
