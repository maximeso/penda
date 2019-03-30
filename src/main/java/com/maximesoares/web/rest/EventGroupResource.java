package com.maximesoares.web.rest;
import com.maximesoares.domain.EventGroup;
import com.maximesoares.service.EventGroupService;
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
 * REST controller for managing EventGroup.
 */
@RestController
@RequestMapping("/api")
public class EventGroupResource {

    private final Logger log = LoggerFactory.getLogger(EventGroupResource.class);

    private static final String ENTITY_NAME = "eventGroup";

    private final EventGroupService eventGroupService;

    public EventGroupResource(EventGroupService eventGroupService) {
        this.eventGroupService = eventGroupService;
    }

    /**
     * POST  /event-groups : Create a new eventGroup.
     *
     * @param eventGroup the eventGroup to create
     * @return the ResponseEntity with status 201 (Created) and with body the new eventGroup, or with status 400 (Bad Request) if the eventGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/event-groups")
    public ResponseEntity<EventGroup> createEventGroup(@Valid @RequestBody EventGroup eventGroup) throws URISyntaxException {
        log.debug("REST request to save EventGroup : {}", eventGroup);
        if (eventGroup.getId() != null) {
            throw new BadRequestAlertException("A new eventGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EventGroup result = eventGroupService.save(eventGroup);
        return ResponseEntity.created(new URI("/api/event-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /event-groups : Updates an existing eventGroup.
     *
     * @param eventGroup the eventGroup to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated eventGroup,
     * or with status 400 (Bad Request) if the eventGroup is not valid,
     * or with status 500 (Internal Server Error) if the eventGroup couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/event-groups")
    public ResponseEntity<EventGroup> updateEventGroup(@Valid @RequestBody EventGroup eventGroup) throws URISyntaxException {
        log.debug("REST request to update EventGroup : {}", eventGroup);
        if (eventGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EventGroup result = eventGroupService.save(eventGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, eventGroup.getId().toString()))
            .body(result);
    }

    /**
     * GET  /event-groups : get all the eventGroups.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of eventGroups in body
     */
    @GetMapping("/event-groups")
    public ResponseEntity<List<EventGroup>> getAllEventGroups(Pageable pageable) {
        log.debug("REST request to get a page of EventGroups");
        Page<EventGroup> page = eventGroupService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/event-groups");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /event-groups/:id : get the "id" eventGroup.
     *
     * @param id the id of the eventGroup to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the eventGroup, or with status 404 (Not Found)
     */
    @GetMapping("/event-groups/{id}")
    public ResponseEntity<EventGroup> getEventGroup(@PathVariable Long id) {
        log.debug("REST request to get EventGroup : {}", id);
        Optional<EventGroup> eventGroup = eventGroupService.findOne(id);
        return ResponseUtil.wrapOrNotFound(eventGroup);
    }

    /**
     * DELETE  /event-groups/:id : delete the "id" eventGroup.
     *
     * @param id the id of the eventGroup to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/event-groups/{id}")
    public ResponseEntity<Void> deleteEventGroup(@PathVariable Long id) {
        log.debug("REST request to delete EventGroup : {}", id);
        eventGroupService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
