package com.hbv.sjomlaslangur.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Favorite.
 */
@Entity
@Table(name = "favorite")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "favorite")
public class Favorite implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "userid", nullable = false)
    private Long userid;

    @NotNull
    @Column(name = "phraseid", nullable = false)
    private Long phraseid;

    @ManyToOne
    @JoinColumn(name = "userthatfavorited_id")
    private User userthatfavorited;

    @ManyToOne
    @JoinColumn(name = "phrasethatisfavorited_id")
    private Phrase phrasethatisfavorited;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Long getPhraseid() {
        return phraseid;
    }

    public void setPhraseid(Long phraseid) {
        this.phraseid = phraseid;
    }

    public User getUserthatfavorited() {
        return userthatfavorited;
    }

    public void setUserthatfavorited(User user) {
        this.userthatfavorited = user;
    }

    public Phrase getPhrasethatisfavorited() {
        return phrasethatisfavorited;
    }

    public void setPhrasethatisfavorited(Phrase phrase) {
        this.phrasethatisfavorited = phrase;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Favorite favorite = (Favorite) o;
        return Objects.equals(id, favorite.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Favorite{" +
            "id=" + id +
            ", userid='" + userid + "'" +
            ", phraseid='" + phraseid + "'" +
            '}';
    }
}
