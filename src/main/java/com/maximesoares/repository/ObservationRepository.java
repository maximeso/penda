package com.maximesoares.repository;

import com.maximesoares.domain.Observation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Observation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ObservationRepository extends JpaRepository<Observation, Long> {

    @Query("select observation from Observation observation where observation.creator.login = ?#{principal.username}")
    List<Observation> findByCreatorIsCurrentUser();

}
