package com.hbv.sjomlaslangur.web.rest;

import com.hbv.sjomlaslangur.Application;
import com.hbv.sjomlaslangur.domain.Phrase;
import com.hbv.sjomlaslangur.repository.PhraseRepository;
import com.hbv.sjomlaslangur.repository.search.PhraseSearchRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the PhraseResource REST controller.
 *
 * @see PhraseResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class PhraseResourceIntTest {

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME.withZone(ZoneId.of("Z"));

    private static final String DEFAULT_TITLE = "AAAAA";
    private static final String UPDATED_TITLE = "BBBBB";
    private static final String DEFAULT_DESCRIPTION = "AAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBB";
    private static final String DEFAULT_EXAMPLE = "AAAAA";
    private static final String UPDATED_EXAMPLE = "BBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneId.systemDefault());
    private static final ZonedDateTime UPDATED_CREATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final String DEFAULT_CREATED_AT_STR = dateTimeFormatter.format(DEFAULT_CREATED_AT);

    private static final Integer DEFAULT_UPVOTES = 1;
    private static final Integer UPDATED_UPVOTES = 2;

    private static final Integer DEFAULT_DOWNVOTES = 1;
    private static final Integer UPDATED_DOWNVOTES = 2;

    private static final Double DEFAULT_HOTNESS = 1D;
    private static final Double UPDATED_HOTNESS = 2D;

    @Inject
    private PhraseRepository phraseRepository;

    @Inject
    private PhraseSearchRepository phraseSearchRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restPhraseMockMvc;

    private Phrase phrase;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PhraseResource phraseResource = new PhraseResource();
        ReflectionTestUtils.setField(phraseResource, "phraseRepository", phraseRepository);
        ReflectionTestUtils.setField(phraseResource, "phraseSearchRepository", phraseSearchRepository);
        this.restPhraseMockMvc = MockMvcBuilders.standaloneSetup(phraseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        phrase = new Phrase();
        phrase.setTitle(DEFAULT_TITLE);
        phrase.setDescription(DEFAULT_DESCRIPTION);
        phrase.setExample(DEFAULT_EXAMPLE);
        phrase.setCreatedAt(DEFAULT_CREATED_AT);
        phrase.setUpvotes(DEFAULT_UPVOTES);
        phrase.setDownvotes(DEFAULT_DOWNVOTES);
        phrase.setHotness(DEFAULT_HOTNESS);
    }

    @Test
    @Transactional
    public void createPhrase() throws Exception {
        int databaseSizeBeforeCreate = phraseRepository.findAll().size();

        // Create the Phrase

        restPhraseMockMvc.perform(post("/api/phrases")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(phrase)))
                .andExpect(status().isCreated());

        // Validate the Phrase in the database
        List<Phrase> phrases = phraseRepository.findAll();
        assertThat(phrases).hasSize(databaseSizeBeforeCreate + 1);
        Phrase testPhrase = phrases.get(phrases.size() - 1);
        assertThat(testPhrase.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testPhrase.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPhrase.getExample()).isEqualTo(DEFAULT_EXAMPLE);
        assertThat(testPhrase.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testPhrase.getUpvotes()).isEqualTo(DEFAULT_UPVOTES);
        assertThat(testPhrase.getDownvotes()).isEqualTo(DEFAULT_DOWNVOTES);
        assertThat(testPhrase.getHotness()).isEqualTo(DEFAULT_HOTNESS);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = phraseRepository.findAll().size();
        // set the field null
        phrase.setTitle(null);

        // Create the Phrase, which fails.

        restPhraseMockMvc.perform(post("/api/phrases")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(phrase)))
                .andExpect(status().isBadRequest());

        List<Phrase> phrases = phraseRepository.findAll();
        assertThat(phrases).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = phraseRepository.findAll().size();
        // set the field null
        phrase.setDescription(null);

        // Create the Phrase, which fails.

        restPhraseMockMvc.perform(post("/api/phrases")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(phrase)))
                .andExpect(status().isBadRequest());

        List<Phrase> phrases = phraseRepository.findAll();
        assertThat(phrases).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkExampleIsRequired() throws Exception {
        int databaseSizeBeforeTest = phraseRepository.findAll().size();
        // set the field null
        phrase.setExample(null);

        // Create the Phrase, which fails.

        restPhraseMockMvc.perform(post("/api/phrases")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(phrase)))
                .andExpect(status().isBadRequest());

        List<Phrase> phrases = phraseRepository.findAll();
        assertThat(phrases).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreatedAtIsRequired() throws Exception {
        int databaseSizeBeforeTest = phraseRepository.findAll().size();
        // set the field null
        phrase.setCreatedAt(null);

        // Create the Phrase, which fails.

        restPhraseMockMvc.perform(post("/api/phrases")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(phrase)))
                .andExpect(status().isBadRequest());

        List<Phrase> phrases = phraseRepository.findAll();
        assertThat(phrases).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPhrases() throws Exception {
        // Initialize the database
        phraseRepository.saveAndFlush(phrase);

        // Get all the phrases
        restPhraseMockMvc.perform(get("/api/phrases"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(phrase.getId().intValue())))
                .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
                .andExpect(jsonPath("$.[*].example").value(hasItem(DEFAULT_EXAMPLE.toString())))
                .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT_STR)))
                .andExpect(jsonPath("$.[*].upvotes").value(hasItem(DEFAULT_UPVOTES)))
                .andExpect(jsonPath("$.[*].downvotes").value(hasItem(DEFAULT_DOWNVOTES)))
                .andExpect(jsonPath("$.[*].hotness").value(hasItem(DEFAULT_HOTNESS.doubleValue())));
    }

    @Test
    @Transactional
    public void getPhrase() throws Exception {
        // Initialize the database
        phraseRepository.saveAndFlush(phrase);

        // Get the phrase
        restPhraseMockMvc.perform(get("/api/phrases/{id}", phrase.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(phrase.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.example").value(DEFAULT_EXAMPLE.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT_STR))
            .andExpect(jsonPath("$.upvotes").value(DEFAULT_UPVOTES))
            .andExpect(jsonPath("$.downvotes").value(DEFAULT_DOWNVOTES))
            .andExpect(jsonPath("$.hotness").value(DEFAULT_HOTNESS.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPhrase() throws Exception {
        // Get the phrase
        restPhraseMockMvc.perform(get("/api/phrases/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePhrase() throws Exception {
        // Initialize the database
        phraseRepository.saveAndFlush(phrase);

		int databaseSizeBeforeUpdate = phraseRepository.findAll().size();

        // Update the phrase
        phrase.setTitle(UPDATED_TITLE);
        phrase.setDescription(UPDATED_DESCRIPTION);
        phrase.setExample(UPDATED_EXAMPLE);
        phrase.setCreatedAt(UPDATED_CREATED_AT);
        phrase.setUpvotes(UPDATED_UPVOTES);
        phrase.setDownvotes(UPDATED_DOWNVOTES);
        phrase.setHotness(UPDATED_HOTNESS);

        restPhraseMockMvc.perform(put("/api/phrases")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(phrase)))
                .andExpect(status().isOk());

        // Validate the Phrase in the database
        List<Phrase> phrases = phraseRepository.findAll();
        assertThat(phrases).hasSize(databaseSizeBeforeUpdate);
        Phrase testPhrase = phrases.get(phrases.size() - 1);
        assertThat(testPhrase.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testPhrase.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPhrase.getExample()).isEqualTo(UPDATED_EXAMPLE);
        assertThat(testPhrase.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testPhrase.getUpvotes()).isEqualTo(UPDATED_UPVOTES);
        assertThat(testPhrase.getDownvotes()).isEqualTo(UPDATED_DOWNVOTES);
        assertThat(testPhrase.getHotness()).isEqualTo(UPDATED_HOTNESS);
    }

    @Test
    @Transactional
    public void deletePhrase() throws Exception {
        // Initialize the database
        phraseRepository.saveAndFlush(phrase);

		int databaseSizeBeforeDelete = phraseRepository.findAll().size();

        // Get the phrase
        restPhraseMockMvc.perform(delete("/api/phrases/{id}", phrase.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Phrase> phrases = phraseRepository.findAll();
        assertThat(phrases).hasSize(databaseSizeBeforeDelete - 1);
    }
}
