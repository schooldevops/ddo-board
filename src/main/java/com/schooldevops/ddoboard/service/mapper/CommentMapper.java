package com.schooldevops.ddoboard.service.mapper;

import com.schooldevops.ddoboard.domain.*;
import com.schooldevops.ddoboard.service.dto.CommentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Comment} and its DTO {@link CommentDTO}.
 */
@Mapper(componentModel = "spring", uses = { PostMapper.class })
public interface CommentMapper extends EntityMapper<CommentDTO, Comment> {
    @Mapping(target = "post", source = "post", qualifiedByName = "id")
    @Mapping(target = "parent", source = "parent", qualifiedByName = "id")
    CommentDTO toDto(Comment s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CommentDTO toDtoId(Comment comment);
}
