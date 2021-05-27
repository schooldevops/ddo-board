package com.schooldevops.ddoboard.service.mapper;

import com.schooldevops.ddoboard.domain.*;
import com.schooldevops.ddoboard.service.dto.AttachGroupDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AttachGroup} and its DTO {@link AttachGroupDTO}.
 */
@Mapper(componentModel = "spring", uses = { PostMapper.class })
public interface AttachGroupMapper extends EntityMapper<AttachGroupDTO, AttachGroup> {
    @Mapping(target = "post", source = "post", qualifiedByName = "id")
    AttachGroupDTO toDto(AttachGroup s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AttachGroupDTO toDtoId(AttachGroup attachGroup);
}
