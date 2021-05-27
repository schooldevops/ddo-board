package com.schooldevops.ddoboard.service;

import com.schooldevops.ddoboard.service.dto.AttachDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.schooldevops.ddoboard.domain.Attach}.
 */
public interface AttachService {
    /**
     * Save a attach.
     *
     * @param attachDTO the entity to save.
     * @return the persisted entity.
     */
    AttachDTO save(AttachDTO attachDTO);

    /**
     * Partially updates a attach.
     *
     * @param attachDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AttachDTO> partialUpdate(AttachDTO attachDTO);

    /**
     * Get all the attaches.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AttachDTO> findAll(Pageable pageable);

    /**
     * Get the "id" attach.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AttachDTO> findOne(Long id);

    /**
     * Delete the "id" attach.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
