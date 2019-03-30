package com.maximesoares.service.impl;

import com.maximesoares.service.EventGroupService;
import com.maximesoares.domain.EventGroup;
import com.maximesoares.repository.EventGroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing EventGroup.
 */
@Service
@Transactional
public class EventGroupServiceImpl implements EventGroupService {

    private final Logger log = LoggerFactory.getLogger(EventGroupServiceImpl.class);

    private final EventGroupRepository eventGroupRepository;

    public EventGroupServiceImpl(EventGroupRepository eventGroupRepository) {
        this.eventGroupRepository = eventGroupRepository;
    }

    /**
     * Save a eventGroup.
     *
     * @param eventGroup the entity to save
     * @return the persisted entity
     */
    @Override
    public EventGroup save(EventGroup eventGroup) {
        log.debug("Request to save EventGroup : {}", eventGroup);
        return eventGroupRepository.save(eventGroup);
    }

    /**
     * Get all the eventGroups.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EventGroup> findAll(Pageable pageable) {
        log.debug("Request to get all EventGroups");
        return eventGroupRepository.findAll(pageable);
    }


    /**
     * Get one eventGroup by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<EventGroup> findOne(Long id) {
        log.debug("Request to get EventGroup : {}", id);
        return eventGroupRepository.findById(id);
    }

    /**
     * Delete the eventGroup by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete EventGroup : {}", id);
        eventGroupRepository.deleteById(id);
    }
}
