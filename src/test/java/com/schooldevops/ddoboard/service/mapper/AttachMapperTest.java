package com.schooldevops.ddoboard.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AttachMapperTest {

    private AttachMapper attachMapper;

    @BeforeEach
    public void setUp() {
        attachMapper = new AttachMapperImpl();
    }
}
