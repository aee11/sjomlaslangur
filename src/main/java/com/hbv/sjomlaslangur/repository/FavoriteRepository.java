package com.hbv.sjomlaslangur.repository;

import com.hbv.sjomlaslangur.domain.Favorite;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Favorite entity.
 */
public interface FavoriteRepository extends JpaRepository<Favorite,Long> {

    @Query("select favorite from Favorite favorite where favorite.userthatfavorited.login = ?#{principal.username}")
    List<Favorite> findByUserthatfavoritedIsCurrentUser();

}
