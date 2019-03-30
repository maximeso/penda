package com.maximesoares.web.rest;
import com.maximesoares.domain.MessageGroup;
import com.maximesoares.service.MessageGroupService;
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
 * REST controller for managing MessageGroup.
 */
@RestController
@RequestMapping("/api")
public class MessageGroupResource {

    private final Logger log = LoggerFactory.getLogger(MessageGroupResource.class);

    private static final String ENTITY_NAME = "messageGroup";

    private final MessageGroupService messageGroupService;

    public MessageGroupResource(MessageGroupService messageGroupService) {
        this.messageGroupService = messageGroupService;
    }

    /**
     * POST  /message-groups : Create a new messageGroup.
     *
     * @param messageGroup the messageGroup to create
     * @return the ResponseEntity with status 201 (Created) and with body the new messageGroup, or with status 400 (Bad Request) if the messageGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/message-groups")
    public ResponseEntity<MessageGroup> createMessageGroup(@Valid @RequestBody MessageGroup messageGroup) throws URISyntaxException {
        log.debug("REST request to save MessageGroup : {}", messageGroup);
        if (messageGroup.getId() != null) {
            throw new BadRequestAlertException("A new messageGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MessageGroup result = messageGroupService.save(messageGroup);
        return ResponseEntity.created(new URI("/api/message-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /message-groups : Updates an existing messageGroup.
     *
     * @param messageGroup the messageGroup to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated messageGroup,
     * or with status 400 (Bad Request) if the messageGroup is not valid,
     * or with status 500 (Internal Server Error) if the messageGroup couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/message-groups")
    public ResponseEntity<MessageGroup> updateMessageGroup(@Valid @RequestBody MessageGroup messageGroup) throws URISyntaxException {
        log.debug("REST request to update MessageGroup : {}", messageGroup);
        if (messageGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MessageGroup result = messageGroupService.save(messageGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, messageGroup.getId().toString()))
            .body(result);
    }

    /**
     * GET  /message-groups : get all the messageGroups.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of messageGroups in body
     */
    @GetMapping("/message-groups")
    public ResponseEntity<List<MessageGroup>> getAllMessageGroups(Pageable pageable) {
        log.debug("REST request to get a page of MessageGroups");
        Page<MessageGroup> page = messageGroupService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/message-groups");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /message-groups/:id : get the "id" messageGroup.
     *
     * @param id the id of the messageGroup to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the messageGroup, or with status 404 (Not Found)
     */
    @GetMapping("/message-groups/{id}")
    public ResponseEntity<MessageGroup> getMessageGroup(@PathVariable Long id) {
        log.debug("REST request to get MessageGroup : {}", id);
        Optional<MessageGroup> messageGroup = messageGroupService.findOne(id);
        return ResponseUtil.wrapOrNotFound(messageGroup);
    }

    /**
     * DELETE  /message-groups/:id : delete the "id" messageGroup.
     *
     * @param id the id of the messageGroup to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/message-groups/{id}")
    public ResponseEntity<Void> deleteMessageGroup(@PathVariable Long id) {
        log.debug("REST request to delete MessageGroup : {}", id);
        messageGroupService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
