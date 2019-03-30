package com.maximesoares.service.impl;

import com.maximesoares.service.MessageGroupService;
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
public class MessageGroupServiceImpl implements MessageGroupService {

    private final Logger log = LoggerFactory.getLogger(MessageGroupServiceImpl.class);

    private final MessageGroupRepository messageGroupRepository;

    public MessageGroupServiceImpl(MessageGroupRepository messageGroupRepository) {
        this.messageGroupRepository = messageGroupRepository;
    }

    /**
     * Save a messageGroup.
     *
     * @param messageGroup the entity to save
     * @return the persisted entity
     */
    @Override
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
    @Override
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
    @Override
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
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MessageGroup : {}", id);
        messageGroupRepository.deleteById(id);
    }
}
