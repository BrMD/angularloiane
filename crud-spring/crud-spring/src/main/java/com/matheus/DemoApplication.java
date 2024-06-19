package com.matheus;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;

import com.matheus.enums.Category;
import com.matheus.model.Course;
import com.matheus.model.Lesson;
import com.matheus.repository.CourseRepository;


@SpringBootApplication
@RestController
public class DemoApplication {
    public static void main(String[] args) {
      SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(CourseRepository courseRepository){
      return args ->{
        courseRepository.deleteAll();
        Course c = new Course();
        c.setName("angular");
        c.setCategory(Category.FRONTEND);
        Lesson l = new Lesson();
       
        l.setName("Introducao");
        l.setYoutubeUrl("watchblabla");
        l.setCourse(c);
        Lesson l1 = new Lesson();
        l1.setName("Angular");
        l1.setYoutubeUrl("watchblabl2");
        l1.setCourse(c);

        c.getLessons().add(l);
        c.getLessons().add(l1);
        courseRepository.save(c);
      };
    }
  }
