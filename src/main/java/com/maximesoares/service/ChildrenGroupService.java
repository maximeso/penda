package com.maximesoares.service;

import com.maximesoares.domain.ChildrenGroup;
import com.maximesoares.repository.ChildrenGroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing ChildrenGroup.
 */
@Service
@Transactional
public class ChildrenGroupService {

    private final Logger log = LoggerFactory.getLogger(ChildrenGroupService.class);

    private final ChildrenGroupRepository childrenGroupRepository;

    public ChildrenGroupService(ChildrenGroupRepository childrenGroupRepository) {
        this.childrenGroupRepository = childrenGroupRepository;
    }

    /**
     * Save a childrenGroup.
     *
     * @param childrenGroup the entity to save
     * @return the persisted entity
     */
    public ChildrenGroup save(ChildrenGroup childrenGroup) {
        log.debug("Request to save ChildrenGroup : {}", childrenGroup);
        return childrenGroupRepository.save(childrenGroup);
    }

    /**
     * Get all the childrenGroups.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ChildrenGroup> findAll(Pageable pageable) {
        log.debug("Request to get all ChildrenGroups");
        return childrenGroupRepository.findAll(pageable);
    }

    /**
     * Get all the ChildrenGroup with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<ChildrenGroup> findAllWithEagerRelationships(Pageable pageable) {
        return childrenGroupRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one childrenGroup by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ChildrenGroup> findOne(Long id) {
        log.debug("Request to get ChildrenGroup : {}", id);
        return childrenGroupRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the childrenGroup by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ChildrenGroup : {}", id);
        childrenGroupRepository.deleteById(id);
    }
}
