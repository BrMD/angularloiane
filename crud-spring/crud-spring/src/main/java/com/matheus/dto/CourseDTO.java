package com.matheus.dto;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.matheus.enums.Category;
import com.matheus.validation.ValueOfEnum;

import jakarta.persistence.Column;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CourseDTO(
    @JsonProperty("id") Long id, 
    @NotNull @NotBlank @Length(min = 5, max = 80) @Column(length = 80, nullable = false) String name, 
    @NotNull @NotBlank @Length(max = 10) @ValueOfEnum(enumClass = Category.class) String category,
    @NotNull @Size(min=1) @Valid List<LessonDTO> lessons) {
}