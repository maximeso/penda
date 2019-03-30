package com.maximesoares.service;

import com.maximesoares.domain.Observation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Observation.
 */
public interface ObservationService {

    /**
     * Save a observation.
     *
     * @param observation the entity to save
     * @return the persisted entity
     */
    Observation save(Observation observation);

    /**
     * Get all the observations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Observation> findAll(Pageable pageable);


    /**
     * Get the "id" observation.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Observation> findOne(Long id);

    /**
     * Delete the "id" observation.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
