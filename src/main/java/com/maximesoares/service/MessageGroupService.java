package com.maximesoares.service;

import com.maximesoares.domain.MessageGroup;
import com.maximesoares.repository.MessageGroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing MessageGroup.
 */
@Service
@Transactional
public class MessageGroupService {

    private final Logger log = LoggerFactory.getLogger(MessageGroupService.class);

    private final MessageGroupRepository messageGroupRepository;

    public MessageGroupService(MessageGroupRepository messageGroupRepository) {
        this.messageGroupRepository = messageGroupRepository;
    }

    /**
     * Save a messageGroup.
     *
     * @param messageGroup the entity to save
     * @return the persisted entity
     */
    public MessageGroup save(MessageGroup messageGroup) {
        log.debug("Request to save MessageGroup : {}", messageGroup);
        return messageGroupRepository.save(messageGroup);
    }

    /**
     * Get all the messageGroups.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<MessageGroup> findAll(Pageable pageable) {
        log.debug("Request to get all MessageGroups");
        return messageGroupRepository.findAll(pageable);
    }


    /**
     * Get one messageGroup by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<MessageGroup> findOne(Long id) {
        log.debug("Request to get MessageGroup : {}", id);
        return messageGroupRepository.findById(id);
    }

    /**
     * Delete the messageGroup by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete MessageGroup : {}", id);
        messageGroupRepository.deleteById(id);
    }
}
