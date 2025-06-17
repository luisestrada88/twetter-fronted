package com.gael.newbackend.repository;

import com.gael.newbackend.model.Reaction;
import com.gael.newbackend.model.User;
import com.gael.newbackend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {
    // Método para encontrar reacciones de un usuario para un post
    Reaction findByUserAndPost(User user, Post post);
}
