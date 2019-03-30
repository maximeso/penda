package com.maximesoares.web.rest;
import com.maximesoares.domain.ChildrenGroup;
import com.maximesoares.service.ChildrenGroupService;
import com.maximesoares.web.rest.errors.BadRequestAlertException;
import com.maximesoares.web.rest.util.HeaderUtil;
import com.maximesoares.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ChildrenGroup.
 */
@RestController
@RequestMapping("/api")
public class ChildrenGroupResource {

    private final Logger log = LoggerFactory.getLogger(ChildrenGroupResource.class);

    private static final String ENTITY_NAME = "childrenGroup";

    private final ChildrenGroupService childrenGroupService;

    public ChildrenGroupResource(ChildrenGroupService childrenGroupService) {
        this.childrenGroupService = childrenGroupService;
    }

    /**
     * POST  /children-groups : Create a new childrenGroup.
     *
     * @param childrenGroup the childrenGroup to create
     * @return the ResponseEntity with status 201 (Created) and with body the new childrenGroup, or with status 400 (Bad Request) if the childrenGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/children-groups")
    public ResponseEntity<ChildrenGroup> createChildrenGroup(@Valid @RequestBody ChildrenGroup childrenGroup) throws URISyntaxException {
        log.debug("REST request to save ChildrenGroup : {}", childrenGroup);
        if (childrenGroup.getId() != null) {
            throw new BadRequestAlertException("A new childrenGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChildrenGroup result = childrenGroupService.save(childrenGroup);
        return ResponseEntity.created(new URI("/api/children-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /children-groups : Updates an existing childrenGroup.
     *
     * @param childrenGroup the childrenGroup to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated childrenGroup,
     * or with status 400 (Bad Request) if the childrenGroup is not valid,
     * or with status 500 (Internal Server Error) if the childrenGroup couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/children-groups")
    public ResponseEntity<ChildrenGroup> updateChildrenGroup(@Valid @RequestBody ChildrenGroup childrenGroup) throws URISyntaxException {
        log.debug("REST request to update ChildrenGroup : {}", childrenGroup);
        if (childrenGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ChildrenGroup result = childrenGroupService.save(childrenGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, childrenGroup.getId().toString()))
            .body(result);
    }

    /**
     * GET  /children-groups : get all the childrenGroups.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of childrenGroups in body
     */
    @GetMapping("/children-groups")
    public ResponseEntity<List<ChildrenGroup>> getAllChildrenGroups(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of ChildrenGroups");
        Page<ChildrenGroup> page;
        if (eagerload) {
            page = childrenGroupService.findAllWithEagerRelationships(pageable);
        } else {
            page = childrenGroupService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/children-groups?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /children-groups/:id : get the "id" childrenGroup.
     *
     * @param id the id of the childrenGroup to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the childrenGroup, or with status 404 (Not Found)
     */
    @GetMapping("/children-groups/{id}")
    public ResponseEntity<ChildrenGroup> getChildrenGroup(@PathVariable Long id) {
        log.debug("REST request to get ChildrenGroup : {}", id);
        Optional<ChildrenGroup> childrenGroup = childrenGroupService.findOne(id);
        return ResponseUtil.wrapOrNotFound(childrenGroup);
    }

    /**
     * DELETE  /children-groups/:id : delete the "id" childrenGroup.
     *
     * @param id the id of the childrenGroup to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/children-groups/{id}")
    public ResponseEntity<Void> deleteChildrenGroup(@PathVariable Long id) {
        log.debug("REST request to delete ChildrenGroup : {}", id);
        childrenGroupService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
