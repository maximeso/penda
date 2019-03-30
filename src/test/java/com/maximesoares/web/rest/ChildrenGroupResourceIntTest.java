package com.maximesoares.web.rest;

import com.maximesoares.PendaApp;

import com.maximesoares.domain.ChildrenGroup;
import com.maximesoares.repository.ChildrenGroupRepository;
import com.maximesoares.service.ChildrenGroupService;
import com.maximesoares.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static com.maximesoares.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ChildrenGroupResource REST controller.
 *
 * @see ChildrenGroupResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PendaApp.class)
public class ChildrenGroupResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ChildrenGroupRepository childrenGroupRepository;

    @Mock
    private ChildrenGroupRepository childrenGroupRepositoryMock;

    @Mock
    private ChildrenGroupService childrenGroupServiceMock;

    @Autowired
    private ChildrenGroupService childrenGroupService;

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

    private MockMvc restChildrenGroupMockMvc;

    private ChildrenGroup childrenGroup;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChildrenGroupResource childrenGroupResource = new ChildrenGroupResource(childrenGroupService);
        this.restChildrenGroupMockMvc = MockMvcBuilders.standaloneSetup(childrenGroupResource)
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
    public static ChildrenGroup createEntity(EntityManager em) {
        ChildrenGroup childrenGroup = new ChildrenGroup()
            .name(DEFAULT_NAME);
        return childrenGroup;
    }

    @Before
    public void initTest() {
        childrenGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createChildrenGroup() throws Exception {
        int databaseSizeBeforeCreate = childrenGroupRepository.findAll().size();

        // Create the ChildrenGroup
        restChildrenGroupMockMvc.perform(post("/api/children-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(childrenGroup)))
            .andExpect(status().isCreated());

        // Validate the ChildrenGroup in the database
        List<ChildrenGroup> childrenGroupList = childrenGroupRepository.findAll();
        assertThat(childrenGroupList).hasSize(databaseSizeBeforeCreate + 1);
        ChildrenGroup testChildrenGroup = childrenGroupList.get(childrenGroupList.size() - 1);
        assertThat(testChildrenGroup.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createChildrenGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = childrenGroupRepository.findAll().size();

        // Create the ChildrenGroup with an existing ID
        childrenGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChildrenGroupMockMvc.perform(post("/api/children-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(childrenGroup)))
            .andExpect(status().isBadRequest());

        // Validate the ChildrenGroup in the database
        List<ChildrenGroup> childrenGroupList = childrenGroupRepository.findAll();
        assertThat(childrenGroupList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = childrenGroupRepository.findAll().size();
        // set the field null
        childrenGroup.setName(null);

        // Create the ChildrenGroup, which fails.

        restChildrenGroupMockMvc.perform(post("/api/children-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(childrenGroup)))
            .andExpect(status().isBadRequest());

        List<ChildrenGroup> childrenGroupList = childrenGroupRepository.findAll();
        assertThat(childrenGroupList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllChildrenGroups() throws Exception {
        // Initialize the database
        childrenGroupRepository.saveAndFlush(childrenGroup);

        // Get all the childrenGroupList
        restChildrenGroupMockMvc.perform(get("/api/children-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(childrenGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllChildrenGroupsWithEagerRelationshipsIsEnabled() throws Exception {
        ChildrenGroupResource childrenGroupResource = new ChildrenGroupResource(childrenGroupServiceMock);
        when(childrenGroupServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restChildrenGroupMockMvc = MockMvcBuilders.standaloneSetup(childrenGroupResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restChildrenGroupMockMvc.perform(get("/api/children-groups?eagerload=true"))
        .andExpect(status().isOk());

        verify(childrenGroupServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllChildrenGroupsWithEagerRelationshipsIsNotEnabled() throws Exception {
        ChildrenGroupResource childrenGroupResource = new ChildrenGroupResource(childrenGroupServiceMock);
            when(childrenGroupServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restChildrenGroupMockMvc = MockMvcBuilders.standaloneSetup(childrenGroupResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restChildrenGroupMockMvc.perform(get("/api/children-groups?eagerload=true"))
        .andExpect(status().isOk());

            verify(childrenGroupServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getChildrenGroup() throws Exception {
        // Initialize the database
        childrenGroupRepository.saveAndFlush(childrenGroup);

        // Get the childrenGroup
        restChildrenGroupMockMvc.perform(get("/api/children-groups/{id}", childrenGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(childrenGroup.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingChildrenGroup() throws Exception {
        // Get the childrenGroup
        restChildrenGroupMockMvc.perform(get("/api/children-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChildrenGroup() throws Exception {
        // Initialize the database
        childrenGroupService.save(childrenGroup);

        int databaseSizeBeforeUpdate = childrenGroupRepository.findAll().size();

        // Update the childrenGroup
        ChildrenGroup updatedChildrenGroup = childrenGroupRepository.findById(childrenGroup.getId()).get();
        // Disconnect from session so that the updates on updatedChildrenGroup are not directly saved in db
        em.detach(updatedChildrenGroup);
        updatedChildrenGroup
            .name(UPDATED_NAME);

        restChildrenGroupMockMvc.perform(put("/api/children-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChildrenGroup)))
            .andExpect(status().isOk());

        // Validate the ChildrenGroup in the database
        List<ChildrenGroup> childrenGroupList = childrenGroupRepository.findAll();
        assertThat(childrenGroupList).hasSize(databaseSizeBeforeUpdate);
        ChildrenGroup testChildrenGroup = childrenGroupList.get(childrenGroupList.size() - 1);
        assertThat(testChildrenGroup.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingChildrenGroup() throws Exception {
        int databaseSizeBeforeUpdate = childrenGroupRepository.findAll().size();

        // Create the ChildrenGroup

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChildrenGroupMockMvc.perform(put("/api/children-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(childrenGroup)))
            .andExpect(status().isBadRequest());

        // Validate the ChildrenGroup in the database
        List<ChildrenGroup> childrenGroupList = childrenGroupRepository.findAll();
        assertThat(childrenGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChildrenGroup() throws Exception {
        // Initialize the database
        childrenGroupService.save(childrenGroup);

        int databaseSizeBeforeDelete = childrenGroupRepository.findAll().size();

        // Delete the childrenGroup
        restChildrenGroupMockMvc.perform(delete("/api/children-groups/{id}", childrenGroup.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ChildrenGroup> childrenGroupList = childrenGroupRepository.findAll();
        assertThat(childrenGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChildrenGroup.class);
        ChildrenGroup childrenGroup1 = new ChildrenGroup();
        childrenGroup1.setId(1L);
        ChildrenGroup childrenGroup2 = new ChildrenGroup();
        childrenGroup2.setId(childrenGroup1.getId());
        assertThat(childrenGroup1).isEqualTo(childrenGroup2);
        childrenGroup2.setId(2L);
        assertThat(childrenGroup1).isNotEqualTo(childrenGroup2);
        childrenGroup1.setId(null);
        assertThat(childrenGroup1).isNotEqualTo(childrenGroup2);
    }
}
