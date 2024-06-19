package com.matheus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.matheus.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long>{
    
}
