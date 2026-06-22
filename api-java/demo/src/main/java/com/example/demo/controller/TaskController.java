package com.example.demo.controller;

import com.example.demo.model.Task;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    @GetMapping
    public List<Task> getTasks(){
        return List.of(
                new Task(1L, "Aprender React", false),
                new Task(2L, "Aprender SpringBoot", true)
        );
    }
    
}
