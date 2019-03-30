package com.maximesoares.service;

import com.maximesoares.domain.MessageGroup;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing MessageGroup.
 */
public interface MessageGroupService {

    /**
     * Save a messageGroup.
     *
     * @param messageGroup the entity to save
     * @return the persisted entity
     */
    MessageGroup save(MessageGroup messageGroup);

    /**
     * Get all the messageGroups.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MessageGroup> findAll(Pageable pageable);


    /**
     * Get the "id" messageGroup.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MessageGroup> findOne(Long id);

    /**
     * Delete the "id" messageGroup.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
