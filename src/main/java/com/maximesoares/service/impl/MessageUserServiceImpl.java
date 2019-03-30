package com.maximesoares.service.impl;

import com.maximesoares.service.MessageUserService;
import com.maximesoares.domain.MessageUser;
import com.maximesoares.repository.MessageUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing MessageUser.
 */
@Service
@Transactional
public class MessageUserServiceImpl implements MessageUserService {

    private final Logger log = LoggerFactory.getLogger(MessageUserServiceImpl.class);

    private final MessageUserRepository messageUserRepository;

    public MessageUserServiceImpl(MessageUserRepository messageUserRepository) {
        this.messageUserRepository = messageUserRepository;
    }

    /**
     * Save a messageUser.
     *
     * @param messageUser the entity to save
     * @return the persisted entity
     */
    @Override
    public MessageUser save(MessageUser messageUser) {
        log.debug("Request to save MessageUser : {}", messageUser);
        return messageUserRepository.save(messageUser);
    }

    /**
     * Get all the messageUsers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<MessageUser> findAll(Pageable pageable) {
        log.debug("Request to get all MessageUsers");
        return messageUserRepository.findAll(pageable);
    }


    /**
     * Get one messageUser by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MessageUser> findOne(Long id) {
        log.debug("Request to get MessageUser : {}", id);
        return messageUserRepository.findById(id);
    }

    /**
     * Delete the messageUser by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MessageUser : {}", id);
        messageUserRepository.deleteById(id);
    }
}
