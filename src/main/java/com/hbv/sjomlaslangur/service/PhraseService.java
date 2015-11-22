package com.hbv.sjomlaslangur.service;

import com.hbv.sjomlaslangur.domain.Phrase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;

@Service
@Transactional
public class PhraseService {

    private final Logger log = LoggerFactory.getLogger(PhraseService.class);

    // returns the new hotNess for the given phrase
    public static double calculateHotness(Phrase phrase) {
        // See http://amix.dk/blog/post/19588
        Integer ups = phrase.getUpvotes();
        Integer downs = phrase.getDownvotes();
        long epochMilli = phrase.getCreatedAt().toLocalDateTime().atZone(ZoneId.of("America/Los_Angeles")).toInstant().toEpochMilli();
        Integer score = ups - downs;
        double order = Math.log10(Math.max(Math.abs(score), 1));
        double sign = Math.signum(score);
        Long seconds = epochMilli / 1000L - 1134028003L;
        double hotness = sign * order + (seconds / 45000.0);
        return hotness;
    }

    public static ArrayList<String> edits(String word) {
        ArrayList<String> result = new ArrayList<String>();
        for(int i=0; i < word.length(); ++i) result.add(word.substring(0, i) + word.substring(i+1));
        for(int i=0; i < word.length()-1; ++i) result.add(word.substring(0, i) + word.substring(i+1, i+2) + word.substring(i, i+1) + word.substring(i+2));
        for(int i=0; i < word.length(); ++i) for(char c='a'; c <= 'z'; ++c) result.add(word.substring(0, i) + String.valueOf(c) + word.substring(i+1));
        for(int i=0; i <= word.length(); ++i) for(char c='a'; c <= 'z'; ++c) result.add(word.substring(0, i) + String.valueOf(c) + word.substring(i));
        return result;
    }

}
