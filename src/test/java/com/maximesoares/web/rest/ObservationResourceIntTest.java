package com.maximesoares.web.rest;

import com.maximesoares.PendaApp;

import com.maximesoares.domain.Observation;
import com.maximesoares.domain.User;
import com.maximesoares.domain.Children;
import com.maximesoares.repository.ObservationRepository;
import com.maximesoares.service.ObservationService;
import com.maximesoares.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.maximesoares.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ObservationResource REST controller.
 *
 * @see ObservationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PendaApp.class)
public class ObservationResourceIntTest {

    private static final LocalDate DEFAULT_CREATED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ObservationRepository observationRepository;

    @Autowired
    private ObservationService observationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restObservationMockMvc;

    private Observation observation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ObservationResource observationResource = new ObservationResource(observationService);
        this.restObservationMockMvc = MockMvcBuilders.standaloneSetup(observationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Observation createEntity(EntityManager em) {
        Observation observation = new Observation()
            .createdDate(DEFAULT_CREATED_DATE)
            .description(DEFAULT_DESCRIPTION);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        observation.setCreator(user);
        // Add required entity
        Children children = ChildrenResourceIntTest.createEntity(em);
        em.persist(children);
        em.flush();
        observation.setChildren(children);
        return observation;
    }

    @Before
    public void initTest() {
        observation = createEntity(em);
    }

    @Test
    @Transactional
    public void createObservation() throws Exception {
        int databaseSizeBeforeCreate = observationRepository.findAll().size();

        // Create the Observation
        restObservationMockMvc.perform(post("/api/observations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(observation)))
            .andExpect(status().isCreated());

        // Validate the Observation in the database
        List<Observation> observationList = observationRepository.findAll();
        assertThat(observationList).hasSize(databaseSizeBeforeCreate + 1);
        Observation testObservation = observationList.get(observationList.size() - 1);
        assertThat(testObservation.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testObservation.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createObservationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = observationRepository.findAll().size();

        // Create the Observation with an existing ID
        observation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restObservationMockMvc.perform(post("/api/observations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(observation)))
            .andExpect(status().isBadRequest());

        // Validate the Observation in the database
        List<Observation> observationList = observationRepository.findAll();
        assertThat(observationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = observationRepository.findAll().size();
        // set the field null
        observation.setCreatedDate(null);

        // Create the Observation, which fails.

        restObservationMockMvc.perform(post("/api/observations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(observation)))
            .andExpect(status().isBadRequest());

        List<Observation> observationList = observationRepository.findAll();
        assertThat(observationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = observationRepository.findAll().size();
        // set the field null
        observation.setDescription(null);

        // Create the Observation, which fails.

        restObservationMockMvc.perform(post("/api/observations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(observation)))
            .andExpect(status().isBadRequest());

        List<Observation> observationList = observationRepository.findAll();
        assertThat(observationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllObservations() throws Exception {
        // Initialize the database
        observationRepository.saveAndFlush(observation);

        // Get all the observationList
        restObservationMockMvc.perform(get("/api/observations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(observation.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getObservation() throws Exception {
        // Initialize the database
        observationRepository.saveAndFlush(observation);

        // Get the observation
        restObservationMockMvc.perform(get("/api/observations/{id}", observation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(observation.getId().intValue()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingObservation() throws Exception {
        // Get the observation
        restObservationMockMvc.perform(get("/api/observations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateObservation() throws Exception {
        // Initialize the database
        observationService.save(observation);

        int databaseSizeBeforeUpdate = observationRepository.findAll().size();

        // Update the observation
        Observation updatedObservation = observationRepository.findById(observation.getId()).get();
        // Disconnect from session so that the updates on updatedObservation are not directly saved in db
        em.detach(updatedObservation);
        updatedObservation
            .createdDate(UPDATED_CREATED_DATE)
            .description(UPDATED_DESCRIPTION);

        restObservationMockMvc.perform(put("/api/observations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedObservation)))
            .andExpect(status().isOk());

        // Validate the Observation in the database
        List<Observation> observationList = observationRepository.findAll();
        assertThat(observationList).hasSize(databaseSizeBeforeUpdate);
        Observation testObservation = observationList.get(observationList.size() - 1);
        assertThat(testObservation.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testObservation.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingObservation() throws Exception {
        int databaseSizeBeforeUpdate = observationRepository.findAll().size();

        // Create the Observation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restObservationMockMvc.perform(put("/api/observations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(observation)))
            .andExpect(status().isBadRequest());

        // Validate the Observation in the database
        List<Observation> observationList = observationRepository.findAll();
        assertThat(observationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteObservation() throws Exception {
        // Initialize the database
        observationService.save(observation);

        int databaseSizeBeforeDelete = observationRepository.findAll().size();

        // Delete the observation
        restObservationMockMvc.perform(delete("/api/observations/{id}", observation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Observation> observationList = observationRepository.findAll();
        assertThat(observationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Observation.class);
        Observation observation1 = new Observation();
        observation1.setId(1L);
        Observation observation2 = new Observation();
        observation2.setId(observation1.getId());
        assertThat(observation1).isEqualTo(observation2);
        observation2.setId(2L);
        assertThat(observation1).isNotEqualTo(observation2);
        observation1.setId(null);
        assertThat(observation1).isNotEqualTo(observation2);
    }
}
