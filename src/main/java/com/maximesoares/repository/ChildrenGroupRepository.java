package com.maximesoares.repository;

import com.maximesoares.domain.ChildrenGroup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the ChildrenGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChildrenGroupRepository extends JpaRepository<ChildrenGroup, Long> {

    @Query(value = "select distinct children_group from ChildrenGroup children_group left join fetch children_group.childrens",
        countQuery = "select count(distinct children_group) from ChildrenGroup children_group")
    Page<ChildrenGroup> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct children_group from ChildrenGroup children_group left join fetch children_group.childrens")
    List<ChildrenGroup> findAllWithEagerRelationships();

    @Query("select children_group from ChildrenGroup children_group left join fetch children_group.childrens where children_group.id =:id")
    Optional<ChildrenGroup> findOneWithEagerRelationships(@Param("id") Long id);

}
