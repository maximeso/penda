package com.maximesoares.repository;

import com.maximesoares.domain.MessageUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the MessageUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageUserRepository extends JpaRepository<MessageUser, Long> {

    @Query("select message_user from MessageUser message_user where message_user.from.login = ?#{principal.username}")
    List<MessageUser> findByFromIsCurrentUser();

    @Query("select message_user from MessageUser message_user where message_user.to.login = ?#{principal.username}")
    List<MessageUser> findByToIsCurrentUser();

}
