package com.schooldevops.ddoboard.repository;

import com.schooldevops.ddoboard.domain.AttachGroup;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AttachGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttachGroupRepository extends JpaRepository<AttachGroup, Long> {}
