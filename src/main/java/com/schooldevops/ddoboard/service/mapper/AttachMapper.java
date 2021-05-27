package com.schooldevops.ddoboard.service.mapper;

import com.schooldevops.ddoboard.domain.*;
import com.schooldevops.ddoboard.service.dto.AttachDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Attach} and its DTO {@link AttachDTO}.
 */
@Mapper(componentModel = "spring", uses = { AttachGroupMapper.class })
public interface AttachMapper extends EntityMapper<AttachDTO, Attach> {
    @Mapping(target = "attachGroup", source = "attachGroup", qualifiedByName = "id")
    AttachDTO toDto(Attach s);
}
