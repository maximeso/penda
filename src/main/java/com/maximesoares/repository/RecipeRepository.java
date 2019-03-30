package com.maximesoares.repository;

import com.maximesoares.domain.Recipe;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Recipe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    @Query("select recipe from Recipe recipe where recipe.creator.login = ?#{principal.username}")
    List<Recipe> findByCreatorIsCurrentUser();

}
