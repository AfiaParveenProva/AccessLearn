package com.education.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.education.model.Course;
import com.education.model.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByCourseOrderByCreatedAtDesc(Course course);
    List<Message> findByCourseAndTypeOrderByCreatedAtDesc(Course course, String type);
} 