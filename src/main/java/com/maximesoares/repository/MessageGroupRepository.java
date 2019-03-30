package com.maximesoares.repository;

import com.maximesoares.domain.MessageGroup;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the MessageGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageGroupRepository extends JpaRepository<MessageGroup, Long> {

    @Query("select message_group from MessageGroup message_group where message_group.creator.login = ?#{principal.username}")
    List<MessageGroup> findByCreatorIsCurrentUser();

}
