package com.maximesoares.web.rest;
import com.maximesoares.domain.Children;
import com.maximesoares.service.ChildrenService;
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
 * REST controller for managing Children.
 */
@RestController
@RequestMapping("/api")
public class ChildrenResource {

    private final Logger log = LoggerFactory.getLogger(ChildrenResource.class);

    private static final String ENTITY_NAME = "children";

    private final ChildrenService childrenService;

    public ChildrenResource(ChildrenService childrenService) {
        this.childrenService = childrenService;
    }

    /**
     * POST  /children : Create a new children.
     *
     * @param children the children to create
     * @return the ResponseEntity with status 201 (Created) and with body the new children, or with status 400 (Bad Request) if the children has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/children")
    public ResponseEntity<Children> createChildren(@Valid @RequestBody Children children) throws URISyntaxException {
        log.debug("REST request to save Children : {}", children);
        if (children.getId() != null) {
            throw new BadRequestAlertException("A new children cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Children result = childrenService.save(children);
        return ResponseEntity.created(new URI("/api/children/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /children : Updates an existing children.
     *
     * @param children the children to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated children,
     * or with status 400 (Bad Request) if the children is not valid,
     * or with status 500 (Internal Server Error) if the children couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/children")
    public ResponseEntity<Children> updateChildren(@Valid @RequestBody Children children) throws URISyntaxException {
        log.debug("REST request to update Children : {}", children);
        if (children.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Children result = childrenService.save(children);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, children.getId().toString()))
            .body(result);
    }

    /**
     * GET  /children : get all the children.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of children in body
     */
    @GetMapping("/children")
    public ResponseEntity<List<Children>> getAllChildren(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Children");
        Page<Children> page;
        if (eagerload) {
            page = childrenService.findAllWithEagerRelationships(pageable);
        } else {
            page = childrenService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/children?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /children/:id : get the "id" children.
     *
     * @param id the id of the children to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the children, or with status 404 (Not Found)
     */
    @GetMapping("/children/{id}")
    public ResponseEntity<Children> getChildren(@PathVariable Long id) {
        log.debug("REST request to get Children : {}", id);
        Optional<Children> children = childrenService.findOne(id);
        return ResponseUtil.wrapOrNotFound(children);
    }

    /**
     * DELETE  /children/:id : delete the "id" children.
     *
     * @param id the id of the children to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/children/{id}")
    public ResponseEntity<Void> deleteChildren(@PathVariable Long id) {
        log.debug("REST request to delete Children : {}", id);
        childrenService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
