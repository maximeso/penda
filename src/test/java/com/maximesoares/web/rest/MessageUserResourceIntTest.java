package com.maximesoares.web.rest;

import com.maximesoares.PendaApp;

import com.maximesoares.domain.MessageUser;
import com.maximesoares.repository.MessageUserRepository;
import com.maximesoares.service.MessageUserService;
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
 * Test class for the MessageUserResource REST controller.
 *
 * @see MessageUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PendaApp.class)
public class MessageUserResourceIntTest {

    private static final LocalDate DEFAULT_CREATED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    @Autowired
    private MessageUserRepository messageUserRepository;

    @Autowired
    private MessageUserService messageUserService;

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

    private MockMvc restMessageUserMockMvc;

    private MessageUser messageUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MessageUserResource messageUserResource = new MessageUserResource(messageUserService);
        this.restMessageUserMockMvc = MockMvcBuilders.standaloneSetup(messageUserResource)
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
    public static MessageUser createEntity(EntityManager em) {
        MessageUser messageUser = new MessageUser()
            .createdDate(DEFAULT_CREATED_DATE)
            .message(DEFAULT_MESSAGE);
        return messageUser;
    }

    @Before
    public void initTest() {
        messageUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createMessageUser() throws Exception {
        int databaseSizeBeforeCreate = messageUserRepository.findAll().size();

        // Create the MessageUser
        restMessageUserMockMvc.perform(post("/api/message-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageUser)))
            .andExpect(status().isCreated());

        // Validate the MessageUser in the database
        List<MessageUser> messageUserList = messageUserRepository.findAll();
        assertThat(messageUserList).hasSize(databaseSizeBeforeCreate + 1);
        MessageUser testMessageUser = messageUserList.get(messageUserList.size() - 1);
        assertThat(testMessageUser.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testMessageUser.getMessage()).isEqualTo(DEFAULT_MESSAGE);
    }

    @Test
    @Transactional
    public void createMessageUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = messageUserRepository.findAll().size();

        // Create the MessageUser with an existing ID
        messageUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMessageUserMockMvc.perform(post("/api/message-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageUser)))
            .andExpect(status().isBadRequest());

        // Validate the MessageUser in the database
        List<MessageUser> messageUserList = messageUserRepository.findAll();
        assertThat(messageUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCreatedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = messageUserRepository.findAll().size();
        // set the field null
        messageUser.setCreatedDate(null);

        // Create the MessageUser, which fails.

        restMessageUserMockMvc.perform(post("/api/message-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageUser)))
            .andExpect(status().isBadRequest());

        List<MessageUser> messageUserList = messageUserRepository.findAll();
        assertThat(messageUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMessageIsRequired() throws Exception {
        int databaseSizeBeforeTest = messageUserRepository.findAll().size();
        // set the field null
        messageUser.setMessage(null);

        // Create the MessageUser, which fails.

        restMessageUserMockMvc.perform(post("/api/message-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageUser)))
            .andExpect(status().isBadRequest());

        List<MessageUser> messageUserList = messageUserRepository.findAll();
        assertThat(messageUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMessageUsers() throws Exception {
        // Initialize the database
        messageUserRepository.saveAndFlush(messageUser);

        // Get all the messageUserList
        restMessageUserMockMvc.perform(get("/api/message-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(messageUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getMessageUser() throws Exception {
        // Initialize the database
        messageUserRepository.saveAndFlush(messageUser);

        // Get the messageUser
        restMessageUserMockMvc.perform(get("/api/message-users/{id}", messageUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(messageUser.getId().intValue()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMessageUser() throws Exception {
        // Get the messageUser
        restMessageUserMockMvc.perform(get("/api/message-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMessageUser() throws Exception {
        // Initialize the database
        messageUserService.save(messageUser);

        int databaseSizeBeforeUpdate = messageUserRepository.findAll().size();

        // Update the messageUser
        MessageUser updatedMessageUser = messageUserRepository.findById(messageUser.getId()).get();
        // Disconnect from session so that the updates on updatedMessageUser are not directly saved in db
        em.detach(updatedMessageUser);
        updatedMessageUser
            .createdDate(UPDATED_CREATED_DATE)
            .message(UPDATED_MESSAGE);

        restMessageUserMockMvc.perform(put("/api/message-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMessageUser)))
            .andExpect(status().isOk());

        // Validate the MessageUser in the database
        List<MessageUser> messageUserList = messageUserRepository.findAll();
        assertThat(messageUserList).hasSize(databaseSizeBeforeUpdate);
        MessageUser testMessageUser = messageUserList.get(messageUserList.size() - 1);
        assertThat(testMessageUser.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testMessageUser.getMessage()).isEqualTo(UPDATED_MESSAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingMessageUser() throws Exception {
        int databaseSizeBeforeUpdate = messageUserRepository.findAll().size();

        // Create the MessageUser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMessageUserMockMvc.perform(put("/api/message-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(messageUser)))
            .andExpect(status().isBadRequest());

        // Validate the MessageUser in the database
        List<MessageUser> messageUserList = messageUserRepository.findAll();
        assertThat(messageUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMessageUser() throws Exception {
        // Initialize the database
        messageUserService.save(messageUser);

        int databaseSizeBeforeDelete = messageUserRepository.findAll().size();

        // Delete the messageUser
        restMessageUserMockMvc.perform(delete("/api/message-users/{id}", messageUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MessageUser> messageUserList = messageUserRepository.findAll();
        assertThat(messageUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MessageUser.class);
        MessageUser messageUser1 = new MessageUser();
        messageUser1.setId(1L);
        MessageUser messageUser2 = new MessageUser();
        messageUser2.setId(messageUser1.getId());
        assertThat(messageUser1).isEqualTo(messageUser2);
        messageUser2.setId(2L);
        assertThat(messageUser1).isNotEqualTo(messageUser2);
        messageUser1.setId(null);
        assertThat(messageUser1).isNotEqualTo(messageUser2);
    }
}
