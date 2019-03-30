package com.maximesoares.web.rest;

import com.maximesoares.PendaApp;

import com.maximesoares.domain.EventGroup;
import com.maximesoares.domain.ChildrenGroup;
import com.maximesoares.repository.EventGroupRepository;
import com.maximesoares.service.EventGroupService;
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
 * Test class for the EventGroupResource REST controller.
 *
 * @see EventGroupResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PendaApp.class)
public class EventGroupResourceIntTest {

    private static final LocalDate DEFAULT_CREATED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private EventGroupRepository eventGroupRepository;

    @Autowired
    private EventGroupService eventGroupService;

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

    private MockMvc restEventGroupMockMvc;

    private EventGroup eventGroup;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EventGroupResource eventGroupResource = new EventGroupResource(eventGroupService);
        this.restEventGroupMockMvc = MockMvcBuilders.standaloneSetup(eventGroupResource)
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
    public static EventGroup createEntity(EntityManager em) {
        EventGroup eventGroup = new EventGroup()
            .createdDate(DEFAULT_CREATED_DATE)
            .name(DEFAULT_NAME);
        // Add required entity
        ChildrenGroup childrenGroup = ChildrenGroupResourceIntTest.createEntity(em);
        em.persist(childrenGroup);
        em.flush();
        eventGroup.setChildrenGroup(childrenGroup);
        return eventGroup;
    }

    @Before
    public void initTest() {
        eventGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createEventGroup() throws Exception {
        int databaseSizeBeforeCreate = eventGroupRepository.findAll().size();

        // Create the EventGroup
        restEventGroupMockMvc.perform(post("/api/event-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventGroup)))
            .andExpect(status().isCreated());

        // Validate the EventGroup in the database
        List<EventGroup> eventGroupList = eventGroupRepository.findAll();
        assertThat(eventGroupList).hasSize(databaseSizeBeforeCreate + 1);
        EventGroup testEventGroup = eventGroupList.get(eventGroupList.size() - 1);
        assertThat(testEventGroup.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testEventGroup.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createEventGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eventGroupRepository.findAll().size();

        // Create the EventGroup with an existing ID
        eventGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEventGroupMockMvc.perform(post("/api/event-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventGroup)))
            .andExpect(status().isBadRequest());

        // Validate the EventGroup in the database
        List<EventGroup> eventGroupList = eventGroupRepository.findAll();
        assertThat(eventGroupList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventGroupRepository.findAll().size();
        // set the field null
        eventGroup.setCreatedDate(null);

        // Create the EventGroup, which fails.

        restEventGroupMockMvc.perform(post("/api/event-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventGroup)))
            .andExpect(status().isBadRequest());

        List<EventGroup> eventGroupList = eventGroupRepository.findAll();
        assertThat(eventGroupList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventGroupRepository.findAll().size();
        // set the field null
        eventGroup.setName(null);

        // Create the EventGroup, which fails.

        restEventGroupMockMvc.perform(post("/api/event-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventGroup)))
            .andExpect(status().isBadRequest());

        List<EventGroup> eventGroupList = eventGroupRepository.findAll();
        assertThat(eventGroupList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEventGroups() throws Exception {
        // Initialize the database
        eventGroupRepository.saveAndFlush(eventGroup);

        // Get all the eventGroupList
        restEventGroupMockMvc.perform(get("/api/event-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eventGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getEventGroup() throws Exception {
        // Initialize the database
        eventGroupRepository.saveAndFlush(eventGroup);

        // Get the eventGroup
        restEventGroupMockMvc.perform(get("/api/event-groups/{id}", eventGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(eventGroup.getId().intValue()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEventGroup() throws Exception {
        // Get the eventGroup
        restEventGroupMockMvc.perform(get("/api/event-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEventGroup() throws Exception {
        // Initialize the database
        eventGroupService.save(eventGroup);

        int databaseSizeBeforeUpdate = eventGroupRepository.findAll().size();

        // Update the eventGroup
        EventGroup updatedEventGroup = eventGroupRepository.findById(eventGroup.getId()).get();
        // Disconnect from session so that the updates on updatedEventGroup are not directly saved in db
        em.detach(updatedEventGroup);
        updatedEventGroup
            .createdDate(UPDATED_CREATED_DATE)
            .name(UPDATED_NAME);

        restEventGroupMockMvc.perform(put("/api/event-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEventGroup)))
            .andExpect(status().isOk());

        // Validate the EventGroup in the database
        List<EventGroup> eventGroupList = eventGroupRepository.findAll();
        assertThat(eventGroupList).hasSize(databaseSizeBeforeUpdate);
        EventGroup testEventGroup = eventGroupList.get(eventGroupList.size() - 1);
        assertThat(testEventGroup.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testEventGroup.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingEventGroup() throws Exception {
        int databaseSizeBeforeUpdate = eventGroupRepository.findAll().size();

        // Create the EventGroup

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEventGroupMockMvc.perform(put("/api/event-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventGroup)))
            .andExpect(status().isBadRequest());

        // Validate the EventGroup in the database
        List<EventGroup> eventGroupList = eventGroupRepository.findAll();
        assertThat(eventGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEventGroup() throws Exception {
        // Initialize the database
        eventGroupService.save(eventGroup);

        int databaseSizeBeforeDelete = eventGroupRepository.findAll().size();

        // Delete the eventGroup
        restEventGroupMockMvc.perform(delete("/api/event-groups/{id}", eventGroup.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EventGroup> eventGroupList = eventGroupRepository.findAll();
        assertThat(eventGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EventGroup.class);
        EventGroup eventGroup1 = new EventGroup();
        eventGroup1.setId(1L);
        EventGroup eventGroup2 = new EventGroup();
        eventGroup2.setId(eventGroup1.getId());
        assertThat(eventGroup1).isEqualTo(eventGroup2);
        eventGroup2.setId(2L);
        assertThat(eventGroup1).isNotEqualTo(eventGroup2);
        eventGroup1.setId(null);
        assertThat(eventGroup1).isNotEqualTo(eventGroup2);
    }
}
