package com.maximesoares.service;

import com.maximesoares.domain.Observation;
import com.maximesoares.repository.ObservationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Observation.
 */
@Service
@Transactional
public class ObservationService {

    private final Logger log = LoggerFactory.getLogger(ObservationService.class);

    private final ObservationRepository observationRepository;

    public ObservationService(ObservationRepository observationRepository) {
        this.observationRepository = observationRepository;
    }

    /**
     * Save a observation.
     *
     * @param observation the entity to save
     * @return the persisted entity
     */
    public Observation save(Observation observation) {
        log.debug("Request to save Observation : {}", observation);
        return observationRepository.save(observation);
    }

    /**
     * Get all the observations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Observation> findAll(Pageable pageable) {
        log.debug("Request to get all Observations");
        return observationRepository.findAll(pageable);
    }


    /**
     * Get one observation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Observation> findOne(Long id) {
        log.debug("Request to get Observation : {}", id);
        return observationRepository.findById(id);
    }

    /**
     * Delete the observation by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Observation : {}", id);
        observationRepository.deleteById(id);
    }
}
