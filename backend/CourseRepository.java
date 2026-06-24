package com.education.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.education.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByTitleContainingIgnoreCase(String title);
    List<Course> findByLevel(String level);
    List<Course> findByCourseFeeLessThanEqual(Double maxFee);
} 