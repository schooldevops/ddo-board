package com.schooldevops.ddoboard.service.mapper;

import com.schooldevops.ddoboard.domain.*;
import com.schooldevops.ddoboard.service.dto.BoardDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Board} and its DTO {@link BoardDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BoardMapper extends EntityMapper<BoardDTO, Board> {
    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    BoardDTO toDtoId(Board board);
}
