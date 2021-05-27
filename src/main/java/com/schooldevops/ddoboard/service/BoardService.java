package com.schooldevops.ddoboard.service;

import com.schooldevops.ddoboard.service.dto.BoardDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.schooldevops.ddoboard.domain.Board}.
 */
public interface BoardService {
    /**
     * Save a board.
     *
     * @param boardDTO the entity to save.
     * @return the persisted entity.
     */
    BoardDTO save(BoardDTO boardDTO);

    /**
     * Partially updates a board.
     *
     * @param boardDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<BoardDTO> partialUpdate(BoardDTO boardDTO);

    /**
     * Get all the boards.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BoardDTO> findAll(Pageable pageable);

    /**
     * Get the "id" board.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BoardDTO> findOne(Long id);

    /**
     * Delete the "id" board.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
