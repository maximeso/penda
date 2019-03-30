package com.maximesoares.service;

import com.maximesoares.domain.MessageUser;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing MessageUser.
 */
public interface MessageUserService {

    /**
     * Save a messageUser.
     *
     * @param messageUser the entity to save
     * @return the persisted entity
     */
    MessageUser save(MessageUser messageUser);

    /**
     * Get all the messageUsers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MessageUser> findAll(Pageable pageable);


    /**
     * Get the "id" messageUser.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MessageUser> findOne(Long id);

    /**
     * Delete the "id" messageUser.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
