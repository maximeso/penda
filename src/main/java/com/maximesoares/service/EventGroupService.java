package com.maximesoares.service;

import com.maximesoares.domain.EventGroup;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing EventGroup.
 */
public interface EventGroupService {

    /**
     * Save a eventGroup.
     *
     * @param eventGroup the entity to save
     * @return the persisted entity
     */
    EventGroup save(EventGroup eventGroup);

    /**
     * Get all the eventGroups.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<EventGroup> findAll(Pageable pageable);


    /**
     * Get the "id" eventGroup.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<EventGroup> findOne(Long id);

    /**
     * Delete the "id" eventGroup.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
