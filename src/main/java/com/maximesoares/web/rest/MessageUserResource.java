package com.maximesoares.web.rest;
import com.maximesoares.domain.MessageUser;
import com.maximesoares.service.MessageUserService;
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
 * REST controller for managing MessageUser.
 */
@RestController
@RequestMapping("/api")
public class MessageUserResource {

    private final Logger log = LoggerFactory.getLogger(MessageUserResource.class);

    private static final String ENTITY_NAME = "messageUser";

    private final MessageUserService messageUserService;

    public MessageUserResource(MessageUserService messageUserService) {
        this.messageUserService = messageUserService;
    }

    /**
     * POST  /message-users : Create a new messageUser.
     *
     * @param messageUser the messageUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new messageUser, or with status 400 (Bad Request) if the messageUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/message-users")
    public ResponseEntity<MessageUser> createMessageUser(@Valid @RequestBody MessageUser messageUser) throws URISyntaxException {
        log.debug("REST request to save MessageUser : {}", messageUser);
        if (messageUser.getId() != null) {
            throw new BadRequestAlertException("A new messageUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MessageUser result = messageUserService.save(messageUser);
        return ResponseEntity.created(new URI("/api/message-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /message-users : Updates an existing messageUser.
     *
     * @param messageUser the messageUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated messageUser,
     * or with status 400 (Bad Request) if the messageUser is not valid,
     * or with status 500 (Internal Server Error) if the messageUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/message-users")
    public ResponseEntity<MessageUser> updateMessageUser(@Valid @RequestBody MessageUser messageUser) throws URISyntaxException {
        log.debug("REST request to update MessageUser : {}", messageUser);
        if (messageUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MessageUser result = messageUserService.save(messageUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, messageUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /message-users : get all the messageUsers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of messageUsers in body
     */
    @GetMapping("/message-users")
    public ResponseEntity<List<MessageUser>> getAllMessageUsers(Pageable pageable) {
        log.debug("REST request to get a page of MessageUsers");
        Page<MessageUser> page = messageUserService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/message-users");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /message-users/:id : get the "id" messageUser.
     *
     * @param id the id of the messageUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the messageUser, or with status 404 (Not Found)
     */
    @GetMapping("/message-users/{id}")
    public ResponseEntity<MessageUser> getMessageUser(@PathVariable Long id) {
        log.debug("REST request to get MessageUser : {}", id);
        Optional<MessageUser> messageUser = messageUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(messageUser);
    }

    /**
     * DELETE  /message-users/:id : delete the "id" messageUser.
     *
     * @param id the id of the messageUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/message-users/{id}")
    public ResponseEntity<Void> deleteMessageUser(@PathVariable Long id) {
        log.debug("REST request to delete MessageUser : {}", id);
        messageUserService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
