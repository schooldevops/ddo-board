package com.schooldevops.ddoboard.repository;

import com.schooldevops.ddoboard.domain.Attach;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Attach entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttachRepository extends JpaRepository<Attach, Long> {}
