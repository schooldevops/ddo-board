package com.schooldevops.ddoboard.service.impl;

import com.schooldevops.ddoboard.domain.AttachGroup;
import com.schooldevops.ddoboard.repository.AttachGroupRepository;
import com.schooldevops.ddoboard.service.AttachGroupService;
import com.schooldevops.ddoboard.service.dto.AttachGroupDTO;
import com.schooldevops.ddoboard.service.mapper.AttachGroupMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link AttachGroup}.
 */
@Service
@Transactional
public class AttachGroupServiceImpl implements AttachGroupService {

    private final Logger log = LoggerFactory.getLogger(AttachGroupServiceImpl.class);

    private final AttachGroupRepository attachGroupRepository;

    private final AttachGroupMapper attachGroupMapper;

    public AttachGroupServiceImpl(AttachGroupRepository attachGroupRepository, AttachGroupMapper attachGroupMapper) {
        this.attachGroupRepository = attachGroupRepository;
        this.attachGroupMapper = attachGroupMapper;
    }

    @Override
    public AttachGroupDTO save(AttachGroupDTO attachGroupDTO) {
        log.debug("Request to save AttachGroup : {}", attachGroupDTO);
        AttachGroup attachGroup = attachGroupMapper.toEntity(attachGroupDTO);
        attachGroup = attachGroupRepository.save(attachGroup);
        return attachGroupMapper.toDto(attachGroup);
    }

    @Override
    public Optional<AttachGroupDTO> partialUpdate(AttachGroupDTO attachGroupDTO) {
        log.debug("Request to partially update AttachGroup : {}", attachGroupDTO);

        return attachGroupRepository
            .findById(attachGroupDTO.getId())
            .map(
                existingAttachGroup -> {
                    attachGroupMapper.partialUpdate(existingAttachGroup, attachGroupDTO);
                    return existingAttachGroup;
                }
            )
            .map(attachGroupRepository::save)
            .map(attachGroupMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AttachGroupDTO> findAll(Pageable pageable) {
        log.debug("Request to get all AttachGroups");
        return attachGroupRepository.findAll(pageable).map(attachGroupMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AttachGroupDTO> findOne(Long id) {
        log.debug("Request to get AttachGroup : {}", id);
        return attachGroupRepository.findById(id).map(attachGroupMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete AttachGroup : {}", id);
        attachGroupRepository.deleteById(id);
    }
}
