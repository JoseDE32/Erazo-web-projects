package com.example.demo.service;

import com.example.demo.model.Task;
import com.example.demo.model.TaskStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    private final List<Task> tasks = new ArrayList<>();

    public TaskService() {
        tasks.add(
                new Task(1L, "Aprender React", "Iniciar todo", TaskStatus.TODO)
        );

        tasks.add(
                new Task(2L, "Aprender SpringBoot", "Iniciar todo", TaskStatus.TODO)
        );
    }

    public List<Task> getAllTasks() {
        return tasks;
    }

    public Task getTaskById(Long id) {
        return tasks.stream()
                .filter(task -> task.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public Task createTask(Task task) {
        task.setId((long) (tasks.size() + 1));
        tasks.add(task);
        return task;
    }

    public Task updateTask(Long id, Task task) {
        Task taskUpdate = getTaskById(id);
        taskUpdate.setTitle(task.getTitle());
        taskUpdate.setDescription(task.getDescription());
        taskUpdate.setStatus(task.getStatus());
        taskUpdate.setUpdatedAt(LocalDateTime.now());
        return taskUpdate;
    }

    public Task patchUpdateTask(Long id, Task task) {
            Task taskUpdate = getTaskById(id);

            if(task.getTitle() !=null ){
                taskUpdate.setTitle(task.getTitle());
            }
            if (task.getDescription() !=null){
                taskUpdate.setDescription(task.getDescription());
            }
            if (task.getStatus() !=null){
                taskUpdate.setStatus(task.getStatus());
            }
            taskUpdate.setUpdatedAt(LocalDateTime.now());
            return taskUpdate;
    }

    public void deleteTask(Long id) {
        tasks.removeIf(task -> task.getId().equals(id));
    }

}
