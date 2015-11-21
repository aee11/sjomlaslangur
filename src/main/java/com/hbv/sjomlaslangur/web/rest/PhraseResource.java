package com.hbv.sjomlaslangur.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hbv.sjomlaslangur.domain.Phrase;
import com.hbv.sjomlaslangur.domain.User;
import com.hbv.sjomlaslangur.repository.PhraseRepository;
import com.hbv.sjomlaslangur.repository.search.PhraseSearchRepository;
import com.hbv.sjomlaslangur.service.PhraseService;
import com.hbv.sjomlaslangur.service.UserService;
import com.hbv.sjomlaslangur.web.rest.util.HeaderUtil;
import com.hbv.sjomlaslangur.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Phrase.
 */
@RestController
@RequestMapping("/api")
public class PhraseResource {

    private final Logger log = LoggerFactory.getLogger(PhraseResource.class);


    @Inject
    private UserService userService;

    @Inject
    private PhraseRepository phraseRepository;

    @Inject
    private PhraseSearchRepository phraseSearchRepository;

    /**
     * POST  /phrases -> Create a new phrase.
     */
    @RequestMapping(value = "/phrases",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Phrase> createPhrase(@Valid @RequestBody Phrase phrase) throws URISyntaxException {
        log.debug("REST request to save Phrase : {}", phrase);
        if (phrase.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new phrase cannot already have an ID").body(null);
        }

        User user = userService.getCurrentUser();
        phrase.setUser(user);
        phrase.setDownvotes(0);
        phrase.setUpvotes(0);
        phrase.setCreatedAt(ZonedDateTime.now());
        phrase.setHotness(PhraseService.calculateHotness(phrase));


        Phrase result = phraseRepository.save(phrase);
        phraseSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/phrases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("phrase", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /phrases -> Updates an existing phrase.
     */
    @RequestMapping(value = "/phrases",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Phrase> updatePhrase(@Valid @RequestBody Phrase phrase) throws URISyntaxException {
        log.debug("REST request to update Phrase : {}", phrase);
        if (phrase.getId() == null) {
            return createPhrase(phrase);
        }
        Phrase result = phraseRepository.save(phrase);
        phraseSearchRepository.save(phrase);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("phrase", phrase.getId().toString()))
            .body(result);
    }

    /**
     * GET  /phrases -> get all the phrases.
     */
    @RequestMapping(value = "/phrases",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Phrase>> getAllPhrases(Pageable pageable)
        throws URISyntaxException {
        Page<Phrase> page = phraseRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/phrases");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /phrases/:id -> get the "id" phrase.
     */
    @RequestMapping(value = "/phrases/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Phrase> getPhrase(@PathVariable Long id) {
        log.debug("REST request to get Phrase : {}", id);
        return Optional.ofNullable(phraseRepository.findOne(id))
            .map(phrase -> new ResponseEntity<>(
                phrase,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /phrases/:id -> delete the "id" phrase.
     */
    @RequestMapping(value = "/phrases/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deletePhrase(@PathVariable Long id) {
        log.debug("REST request to delete Phrase : {}", id);
        phraseRepository.delete(id);
        phraseSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("phrase", id.toString())).build();
    }

    /**
     * SEARCH  /_search/phrases/:query -> search for the phrase corresponding
     * to the query.
     */
    @RequestMapping(value = "/_search/phrases/{query}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Phrase> searchPhrases(@PathVariable String query) {
        return StreamSupport
            .stream(phraseSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

    /**
     * POST  /phrases/:id/upvote -> Upvote a  phrase.
     */
    @RequestMapping(value = "/phrases/{id}/upvote",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Phrase> upvotePhrase(@PathVariable Long id) throws URISyntaxException {
        log.debug("REST request to upvote with id", id);

        // TODO: Handle same user submitting twice

        Phrase phrase = phraseRepository.findOne(id);
        phrase.setUpvotes(phrase.getUpvotes()+1);

        double hotness = PhraseService.calculateHotness(phrase);
        phrase.setHotness(hotness);

        Phrase result = phraseRepository.save(phrase);
        phraseSearchRepository.save(phrase);

        return ResponseEntity.created(new URI("/api/phrases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("phrase", result.getId().toString()))
            .body(result);
    }

    /**
     * POST  /phrases/:id/downvote -> Downvote a  phrase.
     */
    @RequestMapping(value = "/phrases/{id}/downvote",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Phrase> downvotePhrase(@PathVariable Long id) throws URISyntaxException {
        log.debug("REST request to downvote with id", id);

        // TODO: Handle same user submitting twice

        Phrase phrase = phraseRepository.findOne(id);
        phrase.setDownvotes(phrase.getDownvotes()+1);

        double hotness = PhraseService.calculateHotness(phrase);
        phrase.setHotness(hotness);

        Phrase result = phraseRepository.save(phrase);
        phraseSearchRepository.save(phrase);

        return ResponseEntity.created(new URI("/api/phrases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("phrase", result.getId().toString()))
            .body(result);
    }
}
