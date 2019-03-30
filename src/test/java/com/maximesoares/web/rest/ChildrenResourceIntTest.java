package com.maximesoares.web.rest;

import com.maximesoares.PendaApp;

import com.maximesoares.domain.Children;
import com.maximesoares.repository.ChildrenRepository;
import com.maximesoares.service.ChildrenService;
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
 * Test class for the ChildrenResource REST controller.
 *
 * @see ChildrenResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PendaApp.class)
public class ChildrenResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ChildrenRepository childrenRepository;

    @Mock
    private ChildrenRepository childrenRepositoryMock;

    @Mock
    private ChildrenService childrenServiceMock;

    @Autowired
    private ChildrenService childrenService;

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

    private MockMvc restChildrenMockMvc;

    private Children children;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChildrenResource childrenResource = new ChildrenResource(childrenService);
        this.restChildrenMockMvc = MockMvcBuilders.standaloneSetup(childrenResource)
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
    public static Children createEntity(EntityManager em) {
        Children children = new Children()
            .name(DEFAULT_NAME);
        return children;
    }

    @Before
    public void initTest() {
        children = createEntity(em);
    }

    @Test
    @Transactional
    public void createChildren() throws Exception {
        int databaseSizeBeforeCreate = childrenRepository.findAll().size();

        // Create the Children
        restChildrenMockMvc.perform(post("/api/children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(children)))
            .andExpect(status().isCreated());

        // Validate the Children in the database
        List<Children> childrenList = childrenRepository.findAll();
        assertThat(childrenList).hasSize(databaseSizeBeforeCreate + 1);
        Children testChildren = childrenList.get(childrenList.size() - 1);
        assertThat(testChildren.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createChildrenWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = childrenRepository.findAll().size();

        // Create the Children with an existing ID
        children.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChildrenMockMvc.perform(post("/api/children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(children)))
            .andExpect(status().isBadRequest());

        // Validate the Children in the database
        List<Children> childrenList = childrenRepository.findAll();
        assertThat(childrenList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = childrenRepository.findAll().size();
        // set the field null
        children.setName(null);

        // Create the Children, which fails.

        restChildrenMockMvc.perform(post("/api/children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(children)))
            .andExpect(status().isBadRequest());

        List<Children> childrenList = childrenRepository.findAll();
        assertThat(childrenList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllChildren() throws Exception {
        // Initialize the database
        childrenRepository.saveAndFlush(children);

        // Get all the childrenList
        restChildrenMockMvc.perform(get("/api/children?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(children.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllChildrenWithEagerRelationshipsIsEnabled() throws Exception {
        ChildrenResource childrenResource = new ChildrenResource(childrenServiceMock);
        when(childrenServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restChildrenMockMvc = MockMvcBuilders.standaloneSetup(childrenResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restChildrenMockMvc.perform(get("/api/children?eagerload=true"))
        .andExpect(status().isOk());

        verify(childrenServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllChildrenWithEagerRelationshipsIsNotEnabled() throws Exception {
        ChildrenResource childrenResource = new ChildrenResource(childrenServiceMock);
            when(childrenServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restChildrenMockMvc = MockMvcBuilders.standaloneSetup(childrenResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restChildrenMockMvc.perform(get("/api/children?eagerload=true"))
        .andExpect(status().isOk());

            verify(childrenServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getChildren() throws Exception {
        // Initialize the database
        childrenRepository.saveAndFlush(children);

        // Get the children
        restChildrenMockMvc.perform(get("/api/children/{id}", children.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(children.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingChildren() throws Exception {
        // Get the children
        restChildrenMockMvc.perform(get("/api/children/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChildren() throws Exception {
        // Initialize the database
        childrenService.save(children);

        int databaseSizeBeforeUpdate = childrenRepository.findAll().size();

        // Update the children
        Children updatedChildren = childrenRepository.findById(children.getId()).get();
        // Disconnect from session so that the updates on updatedChildren are not directly saved in db
        em.detach(updatedChildren);
        updatedChildren
            .name(UPDATED_NAME);

        restChildrenMockMvc.perform(put("/api/children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChildren)))
            .andExpect(status().isOk());

        // Validate the Children in the database
        List<Children> childrenList = childrenRepository.findAll();
        assertThat(childrenList).hasSize(databaseSizeBeforeUpdate);
        Children testChildren = childrenList.get(childrenList.size() - 1);
        assertThat(testChildren.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingChildren() throws Exception {
        int databaseSizeBeforeUpdate = childrenRepository.findAll().size();

        // Create the Children

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChildrenMockMvc.perform(put("/api/children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(children)))
            .andExpect(status().isBadRequest());

        // Validate the Children in the database
        List<Children> childrenList = childrenRepository.findAll();
        assertThat(childrenList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChildren() throws Exception {
        // Initialize the database
        childrenService.save(children);

        int databaseSizeBeforeDelete = childrenRepository.findAll().size();

        // Delete the children
        restChildrenMockMvc.perform(delete("/api/children/{id}", children.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Children> childrenList = childrenRepository.findAll();
        assertThat(childrenList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Children.class);
        Children children1 = new Children();
        children1.setId(1L);
        Children children2 = new Children();
        children2.setId(children1.getId());
        assertThat(children1).isEqualTo(children2);
        children2.setId(2L);
        assertThat(children1).isNotEqualTo(children2);
        children1.setId(null);
        assertThat(children1).isNotEqualTo(children2);
    }
}
