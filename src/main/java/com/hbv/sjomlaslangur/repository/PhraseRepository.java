package com.hbv.sjomlaslangur.repository;

import com.hbv.sjomlaslangur.domain.Phrase;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Phrase entity.
 */
public interface PhraseRepository extends JpaRepository<Phrase,Long> {

    @Query("select phrase from Phrase phrase where phrase.user.login = ?#{principal.username}")
    List<Phrase> findByUserIsCurrentUser();


    @Query("select p from Phrase p where p.user.id = :userId")
    List<Phrase> findUserPhrases(@Param("userId") Long userId);
}
