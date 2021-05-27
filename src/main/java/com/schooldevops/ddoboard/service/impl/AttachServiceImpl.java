package com.schooldevops.ddoboard.service.impl;

import com.schooldevops.ddoboard.domain.Attach;
import com.schooldevops.ddoboard.repository.AttachRepository;
import com.schooldevops.ddoboard.service.AttachService;
import com.schooldevops.ddoboard.service.dto.AttachDTO;
import com.schooldevops.ddoboard.service.mapper.AttachMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Attach}.
 */
@Service
@Transactional
public class AttachServiceImpl implements AttachService {

    private final Logger log = LoggerFactory.getLogger(AttachServiceImpl.class);

    private final AttachRepository attachRepository;

    private final AttachMapper attachMapper;

    public AttachServiceImpl(AttachRepository attachRepository, AttachMapper attachMapper) {
        this.attachRepository = attachRepository;
        this.attachMapper = attachMapper;
    }

    @Override
    public AttachDTO save(AttachDTO attachDTO) {
        log.debug("Request to save Attach : {}", attachDTO);
        Attach attach = attachMapper.toEntity(attachDTO);
        attach = attachRepository.save(attach);
        return attachMapper.toDto(attach);
    }

    @Override
    public Optional<AttachDTO> partialUpdate(AttachDTO attachDTO) {
        log.debug("Request to partially update Attach : {}", attachDTO);

        return attachRepository
            .findById(attachDTO.getId())
            .map(
                existingAttach -> {
                    attachMapper.partialUpdate(existingAttach, attachDTO);
                    return existingAttach;
                }
            )
            .map(attachRepository::save)
            .map(attachMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AttachDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Attaches");
        return attachRepository.findAll(pageable).map(attachMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AttachDTO> findOne(Long id) {
        log.debug("Request to get Attach : {}", id);
        return attachRepository.findById(id).map(attachMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Attach : {}", id);
        attachRepository.deleteById(id);
    }
}
