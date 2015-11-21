package com.hbv.sjomlaslangur.repository.search;

import com.hbv.sjomlaslangur.domain.Phrase;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the Phrase entity.
 */
public interface PhraseSearchRepository extends ElasticsearchRepository<Phrase, Long> {
}
