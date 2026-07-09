package com.example.demo.controller;

import com.example.demo.dto.TaskFilterDto;
import com.example.demo.model.Task;
import com.example.demo.model.TaskStatus;
import com.example.demo.service.TaskService;
import com.example.demo.repositories.TaskRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;
    private final TaskRepository taskRepository;

    public TaskController(TaskService taskService, TaskRepository taskRepository) {
        this.taskService = taskService;
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id){
        return taskService.getTaskById(id);
    }

    @PostMapping
    public Task createTask(@RequestBody Task task){
        return taskService.createTask(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task){
        return taskService.updateTask(id, task);
    }

    @PatchMapping("/{id}")
    public Task patchUpdateTask(@PathVariable Long id, @RequestBody Task task){
        return taskService.patchUpdateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
    }

    @GetMapping("/getPaginationFilterSort")
    public Page<Task> getTasks(

            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size,

            @RequestParam(required = false) String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String titleAndDescription,

            @RequestParam(required = false) List<TaskStatus> status,

            @RequestParam(required = false) LocalDateTime createdFrom,
            @RequestParam(required = false) LocalDateTime createdTo,

            @RequestParam(required = false) LocalDateTime updatedFrom,
            @RequestParam(required = false) LocalDateTime updatedTo,

            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {

        TaskFilterDto filter = new TaskFilterDto();

        filter.setPage(page);
        filter.setSize(size);

        filter.setTitle(title);
        filter.setDescription(description);
        filter.setTitleAndDescription(titleAndDescription);

        filter.setStatus(status);

        filter.setCreatedFrom(createdFrom);
        filter.setCreatedTo(createdTo);

        filter.setUpdatedFrom(updatedFrom);
        filter.setUpdatedTo(updatedTo);

        filter.setSortBy(sortBy);
        filter.setDirection(direction);

        return taskService.getFilterPaginationSort(filter);
    }

    @PostMapping("/postPaginationFilterSort")
    public Page<Task> searchTasks(
            @RequestBody TaskFilterDto filter
    ) {
        return taskService.postFilterPaginationSort(filter);
    }

}
