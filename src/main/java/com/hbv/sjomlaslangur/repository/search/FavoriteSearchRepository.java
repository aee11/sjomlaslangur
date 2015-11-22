package com.hbv.sjomlaslangur.repository.search;

import com.hbv.sjomlaslangur.domain.Favorite;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the Favorite entity.
 */
public interface FavoriteSearchRepository extends ElasticsearchRepository<Favorite, Long> {
}
