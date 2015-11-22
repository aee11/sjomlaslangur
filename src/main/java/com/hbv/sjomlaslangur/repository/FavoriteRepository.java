package com.hbv.sjomlaslangur.repository;

import com.hbv.sjomlaslangur.domain.Favorite;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Favorite entity.
 */
public interface FavoriteRepository extends JpaRepository<Favorite,Long> {

    @Query("select favorite from Favorite favorite where favorite.userthatfavorited.login = ?#{principal.username}")
    List<Favorite> findByUserthatfavoritedIsCurrentUser();

    @Query("select favorite from Favorite favorite where favorite.userid = :userid and favorite.phraseid = :phraseid ")
    List<Favorite> findSpecific(@Param("userid") Long userid, @Param("phraseid")Long phraseid);


}
