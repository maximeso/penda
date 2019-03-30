package com.maximesoares.web.rest;

import com.maximesoares.PendaApp;

import com.maximesoares.domain.MessageGroup;
import com.maximesoares.domain.User;
import com.maximesoares.domain.ChildrenGroup;
import com.maximesoares.repository.MessageGroupRepository;
import com.maximesoares.service.MessageGroupService;
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
 * Test class for the MessageGroupResource REST controller.
 *
 * @see MessageGroupResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PendaApp.class)
public class MessageGroupResourceIntTest {

    private static final LocalDate DEFAULT_CREATED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    @Autowired
    private MessageGroupRepository messageGroupRepository;

    @Autowired
    private MessageGroupService messageGroupService;

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

    private MockMvc restMessageGroupMockMvc;

    private MessageGroup messageGroup;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MessageGroupResource messageGroupResource = new MessageGroupResource(messageGroupService);
        this.restMessageGroupMockMvc = MockMvcBuilders.standaloneSetup(messageGroupResource)
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
    public static MessageGroup createEntity(EntityManager em) {
        MessageGroup messageGroup = new MessageGroup()
            .createdDate(DEFAULT_CREATED_DATE)
            .message(DEFAULT_MESSAGE);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        messageGroup.setCreator(user);
        // Add required entity
        ChildrenGroup childrenGroup = ChildrenGroupResourceIntTest.createEntity(em);
        em.persist(childrenGroup);
        em.flush();
        messageGroup.setChildrenGroup(childrenGroup);
        return messageGroup;
    }

    @Before
    public void initTest() {
        messageGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createMessageGroup() throws Exception {
        int databaseSizeBeforeCreate = messageGroupRepository.findAll().size();

        // Create the MessageGroup
        restMessageGroupMockMvc.perform(post("/api/message-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageGroup)))
            .andExpect(status().isCreated());

        // Validate the MessageGroup in the database
        List<MessageGroup> messageGroupList = messageGroupRepository.findAll();
        assertThat(messageGroupList).hasSize(databaseSizeBeforeCreate + 1);
        MessageGroup testMessageGroup = messageGroupList.get(messageGroupList.size() - 1);
        assertThat(testMessageGroup.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testMessageGroup.getMessage()).isEqualTo(DEFAULT_MESSAGE);
    }

    @Test
    @Transactional
    public void createMessageGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = messageGroupRepository.findAll().size();

        // Create the MessageGroup with an existing ID
        messageGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMessageGroupMockMvc.perform(post("/api/message-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageGroup)))
            .andExpect(status().isBadRequest());

        // Validate the MessageGroup in the database
        List<MessageGroup> messageGroupList = messageGroupRepository.findAll();
        assertThat(messageGroupList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = messageGroupRepository.findAll().size();
        // set the field null
        messageGroup.setCreatedDate(null);

        // Create the MessageGroup, which fails.

        restMessageGroupMockMvc.perform(post("/api/message-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageGroup)))
            .andExpect(status().isBadRequest());

        List<MessageGroup> messageGroupList = messageGroupRepository.findAll();
        assertThat(messageGroupList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMessageIsRequired() throws Exception {
        int databaseSizeBeforeTest = messageGroupRepository.findAll().size();
        // set the field null
        messageGroup.setMessage(null);

        // Create the MessageGroup, which fails.

        restMessageGroupMockMvc.perform(post("/api/message-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageGroup)))
            .andExpect(status().isBadRequest());

        List<MessageGroup> messageGroupList = messageGroupRepository.findAll();
        assertThat(messageGroupList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMessageGroups() throws Exception {
        // Initialize the database
        messageGroupRepository.saveAndFlush(messageGroup);

        // Get all the messageGroupList
        restMessageGroupMockMvc.perform(get("/api/message-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(messageGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getMessageGroup() throws Exception {
        // Initialize the database
        messageGroupRepository.saveAndFlush(messageGroup);

        // Get the messageGroup
        restMessageGroupMockMvc.perform(get("/api/message-groups/{id}", messageGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(messageGroup.getId().intValue()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMessageGroup() throws Exception {
        // Get the messageGroup
        restMessageGroupMockMvc.perform(get("/api/message-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMessageGroup() throws Exception {
        // Initialize the database
        messageGroupService.save(messageGroup);

        int databaseSizeBeforeUpdate = messageGroupRepository.findAll().size();

        // Update the messageGroup
        MessageGroup updatedMessageGroup = messageGroupRepository.findById(messageGroup.getId()).get();
        // Disconnect from session so that the updates on updatedMessageGroup are not directly saved in db
        em.detach(updatedMessageGroup);
        updatedMessageGroup
            .createdDate(UPDATED_CREATED_DATE)
            .message(UPDATED_MESSAGE);

        restMessageGroupMockMvc.perform(put("/api/message-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMessageGroup)))
            .andExpect(status().isOk());

        // Validate the MessageGroup in the database
        List<MessageGroup> messageGroupList = messageGroupRepository.findAll();
        assertThat(messageGroupList).hasSize(databaseSizeBeforeUpdate);
        MessageGroup testMessageGroup = messageGroupList.get(messageGroupList.size() - 1);
        assertThat(testMessageGroup.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testMessageGroup.getMessage()).isEqualTo(UPDATED_MESSAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingMessageGroup() throws Exception {
        int databaseSizeBeforeUpdate = messageGroupRepository.findAll().size();

        // Create the MessageGroup

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMessageGroupMockMvc.perform(put("/api/message-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageGroup)))
            .andExpect(status().isBadRequest());

        // Validate the MessageGroup in the database
        List<MessageGroup> messageGroupList = messageGroupRepository.findAll();
        assertThat(messageGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMessageGroup() throws Exception {
        // Initialize the database
        messageGroupService.save(messageGroup);

        int databaseSizeBeforeDelete = messageGroupRepository.findAll().size();

        // Delete the messageGroup
        restMessageGroupMockMvc.perform(delete("/api/message-groups/{id}", messageGroup.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MessageGroup> messageGroupList = messageGroupRepository.findAll();
        assertThat(messageGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MessageGroup.class);
        MessageGroup messageGroup1 = new MessageGroup();
        messageGroup1.setId(1L);
        MessageGroup messageGroup2 = new MessageGroup();
        messageGroup2.setId(messageGroup1.getId());
        assertThat(messageGroup1).isEqualTo(messageGroup2);
        messageGroup2.setId(2L);
        assertThat(messageGroup1).isNotEqualTo(messageGroup2);
        messageGroup1.setId(null);
        assertThat(messageGroup1).isNotEqualTo(messageGroup2);
    }
}
