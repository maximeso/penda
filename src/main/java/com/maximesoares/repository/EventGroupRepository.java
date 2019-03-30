package com.maximesoares.repository;

import com.maximesoares.domain.EventGroup;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EventGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventGroupRepository extends JpaRepository<EventGroup, Long> {

}
