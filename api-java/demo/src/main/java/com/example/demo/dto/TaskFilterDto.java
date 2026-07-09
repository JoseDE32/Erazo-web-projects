package com.example.demo.dto;

import com.example.demo.model.TaskStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class TaskFilterDto {

    private String title;

    private String description;

    private String titleAndDescription;

    private List<TaskStatus> status;

    private LocalDateTime createdFrom;
    private LocalDateTime createdTo;

    private LocalDateTime updatedFrom;
    private LocalDateTime updatedTo;

    private Integer page = 0;
    private Integer size = 10;

    private String sortBy = "id";
    private String direction = "asc";
}