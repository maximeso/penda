package com.maximesoares.service;

import com.maximesoares.domain.Children;
import com.maximesoares.repository.ChildrenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Children.
 */
@Service
@Transactional
public class ChildrenService {

    private final Logger log = LoggerFactory.getLogger(ChildrenService.class);

    private final ChildrenRepository childrenRepository;

    public ChildrenService(ChildrenRepository childrenRepository) {
        this.childrenRepository = childrenRepository;
    }

    /**
     * Save a children.
     *
     * @param children the entity to save
     * @return the persisted entity
     */
    public Children save(Children children) {
        log.debug("Request to save Children : {}", children);
        return childrenRepository.save(children);
    }

    /**
     * Get all the children.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Children> findAll(Pageable pageable) {
        log.debug("Request to get all Children");
        return childrenRepository.findAll(pageable);
    }

    /**
     * Get all the Children with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<Children> findAllWithEagerRelationships(Pageable pageable) {
        return childrenRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one children by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Children> findOne(Long id) {
        log.debug("Request to get Children : {}", id);
        return childrenRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the children by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Children : {}", id);
        childrenRepository.deleteById(id);
    }
}
