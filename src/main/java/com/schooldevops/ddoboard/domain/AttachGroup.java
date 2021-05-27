package com.schooldevops.ddoboard.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A AttachGroup.
 */
@Entity
@Table(name = "attach_group")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AttachGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "created_at", nullable = false)
    private ZonedDateTime createdAt;

    @NotNull
    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @JsonIgnoreProperties(value = { "board" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Post post;

    @OneToMany(mappedBy = "attachGroup")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "attachGroup" }, allowSetters = true)
    private Set<Attach> attaches = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AttachGroup id(Long id) {
        this.id = id;
        return this;
    }

    public ZonedDateTime getCreatedAt() {
        return this.createdAt;
    }

    public AttachGroup createdAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public AttachGroup createdBy(Long createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Post getPost() {
        return this.post;
    }

    public AttachGroup post(Post post) {
        this.setPost(post);
        return this;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Set<Attach> getAttaches() {
        return this.attaches;
    }

    public AttachGroup attaches(Set<Attach> attaches) {
        this.setAttaches(attaches);
        return this;
    }

    public AttachGroup addAttach(Attach attach) {
        this.attaches.add(attach);
        attach.setAttachGroup(this);
        return this;
    }

    public AttachGroup removeAttach(Attach attach) {
        this.attaches.remove(attach);
        attach.setAttachGroup(null);
        return this;
    }

    public void setAttaches(Set<Attach> attaches) {
        if (this.attaches != null) {
            this.attaches.forEach(i -> i.setAttachGroup(null));
        }
        if (attaches != null) {
            attaches.forEach(i -> i.setAttachGroup(this));
        }
        this.attaches = attaches;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AttachGroup)) {
            return false;
        }
        return id != null && id.equals(((AttachGroup) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AttachGroup{" +
            "id=" + getId() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", createdBy=" + getCreatedBy() +
            "}";
    }
}
