package com.schooldevops.ddoboard.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AttachGroupMapperTest {

    private AttachGroupMapper attachGroupMapper;

    @BeforeEach
    public void setUp() {
        attachGroupMapper = new AttachGroupMapperImpl();
    }
}
