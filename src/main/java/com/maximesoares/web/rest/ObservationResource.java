package com.maximesoares.web.rest;
import com.maximesoares.domain.Observation;
import com.maximesoares.service.ObservationService;
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
 * REST controller for managing Observation.
 */
@RestController
@RequestMapping("/api")
public class ObservationResource {

    private final Logger log = LoggerFactory.getLogger(ObservationResource.class);

    private static final String ENTITY_NAME = "observation";

    private final ObservationService observationService;

    public ObservationResource(ObservationService observationService) {
        this.observationService = observationService;
    }

    /**
     * POST  /observations : Create a new observation.
     *
     * @param observation the observation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new observation, or with status 400 (Bad Request) if the observation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/observations")
    public ResponseEntity<Observation> createObservation(@Valid @RequestBody Observation observation) throws URISyntaxException {
        log.debug("REST request to save Observation : {}", observation);
        if (observation.getId() != null) {
            throw new BadRequestAlertException("A new observation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Observation result = observationService.save(observation);
        return ResponseEntity.created(new URI("/api/observations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /observations : Updates an existing observation.
     *
     * @param observation the observation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated observation,
     * or with status 400 (Bad Request) if the observation is not valid,
     * or with status 500 (Internal Server Error) if the observation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/observations")
    public ResponseEntity<Observation> updateObservation(@Valid @RequestBody Observation observation) throws URISyntaxException {
        log.debug("REST request to update Observation : {}", observation);
        if (observation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Observation result = observationService.save(observation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, observation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /observations : get all the observations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of observations in body
     */
    @GetMapping("/observations")
    public ResponseEntity<List<Observation>> getAllObservations(Pageable pageable) {
        log.debug("REST request to get a page of Observations");
        Page<Observation> page = observationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/observations");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /observations/:id : get the "id" observation.
     *
     * @param id the id of the observation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the observation, or with status 404 (Not Found)
     */
    @GetMapping("/observations/{id}")
    public ResponseEntity<Observation> getObservation(@PathVariable Long id) {
        log.debug("REST request to get Observation : {}", id);
        Optional<Observation> observation = observationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(observation);
    }

    /**
     * DELETE  /observations/:id : delete the "id" observation.
     *
     * @param id the id of the observation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/observations/{id}")
    public ResponseEntity<Void> deleteObservation(@PathVariable Long id) {
        log.debug("REST request to delete Observation : {}", id);
        observationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
