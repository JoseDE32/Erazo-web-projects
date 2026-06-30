package com.example.demo.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Task {

    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private LocalDateTime createAt;
    private LocalDateTime updatedAt;

    public Task(){
    }

    public Task(Long id, String title, String description, TaskStatus status){
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.createAt = LocalDateTime.now();
    }

}
