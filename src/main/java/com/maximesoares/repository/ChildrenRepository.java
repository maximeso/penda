package com.maximesoares.repository;

import com.maximesoares.domain.Children;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Children entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChildrenRepository extends JpaRepository<Children, Long> {

    @Query(value = "select distinct children from Children children left join fetch children.tutors",
        countQuery = "select count(distinct children) from Children children")
    Page<Children> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct children from Children children left join fetch children.tutors")
    List<Children> findAllWithEagerRelationships();

    @Query("select children from Children children left join fetch children.tutors where children.id =:id")
    Optional<Children> findOneWithEagerRelationships(@Param("id") Long id);

}
