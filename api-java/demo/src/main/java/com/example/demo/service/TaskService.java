package com.example.demo.service;

import com.example.demo.dto.TaskFilterDto;
import com.example.demo.model.Task;
import com.example.demo.model.TaskStatus;
import com.example.demo.repositories.TaskRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.criteria.Predicate;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    public Task createTask(Task task) {
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());

        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task task) {
        Task taskUpdate = getTaskById(id);
        taskUpdate.setTitle(task.getTitle());
        taskUpdate.setDescription(task.getDescription());
        taskUpdate.setStatus(task.getStatus());
        taskUpdate.setUpdatedAt(LocalDateTime.now());
        return taskRepository.save(taskUpdate);
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

        return taskRepository.save(taskUpdate);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public Page<Task> getFilterPaginationSort(TaskFilterDto filter) {
        return executeFilter(filter);
    }

    public Page<Task> postFilterPaginationSort(TaskFilterDto filter) {
        return executeFilter(filter);
    }

    private Page<Task> executeFilter(TaskFilterDto filter) {

        Sort sort = filter.getDirection().equalsIgnoreCase("desc")
                ? Sort.by(filter.getSortBy()).descending()
                : Sort.by(filter.getSortBy()).ascending();

        Pageable pageable = PageRequest.of(
                filter.getPage(),
                filter.getSize(),
                sort
        );

        Specification<Task> specification = (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            // TITLE
            if (filter.getTitle() != null && !filter.getTitle().isBlank()) {

                predicates.add(
                        cb.like(
                                cb.lower(root.get("title")),
                                "%" + filter.getTitle().toLowerCase() + "%"
                        )
                );
            }

            // DESCRIPTION
            if (filter.getDescription() != null &&
                    !filter.getDescription().isBlank()) {

                predicates.add(
                        cb.like(
                                cb.lower(root.get("description")),
                                "%" + filter.getDescription().toLowerCase() + "%"
                        )
                );
            }

            // TITLE OR DESCRIPTION
            if (filter.getTitleAndDescription() != null &&
                    !filter.getTitleAndDescription().isBlank()) {

                Predicate title =
                        cb.like(
                                cb.lower(root.get("title")),
                                "%" + filter.getTitleAndDescription().toLowerCase() + "%"
                        );

                Predicate description =
                        cb.like(
                                cb.lower(root.get("description")),
                                "%" + filter.getTitleAndDescription().toLowerCase() + "%"
                        );

                predicates.add(cb.or(title, description));
            }

            // STATUS
            if (filter.getStatus() != null &&
                    !filter.getStatus().isEmpty()) {

                predicates.add(root.get("status").in(filter.getStatus()));
            }

            // CREATED
            if (filter.getCreatedFrom() != null &&
                    filter.getCreatedTo() != null) {

                predicates.add(
                        cb.between(
                                root.get("createdAt"),
                                filter.getCreatedFrom(),
                                filter.getCreatedTo()
                        )
                );

            } else if (filter.getCreatedFrom() != null) {

                predicates.add(
                        cb.greaterThanOrEqualTo(
                                root.get("createdAt"),
                                filter.getCreatedFrom()
                        )
                );

            } else if (filter.getCreatedTo() != null) {

                predicates.add(
                        cb.lessThanOrEqualTo(
                                root.get("createdAt"),
                                filter.getCreatedTo()
                        )
                );
            }

            // UPDATED
            if (filter.getUpdatedFrom() != null &&
                    filter.getUpdatedTo() != null) {

                predicates.add(
                        cb.between(
                                root.get("updatedAt"),
                                filter.getUpdatedFrom(),
                                filter.getUpdatedTo()
                        )
                );

            } else if (filter.getUpdatedFrom() != null) {

                predicates.add(
                        cb.greaterThanOrEqualTo(
                                root.get("updatedAt"),
                                filter.getUpdatedFrom()
                        )
                );

            } else if (filter.getUpdatedTo() != null) {

                predicates.add(
                        cb.lessThanOrEqualTo(
                                root.get("updatedAt"),
                                filter.getUpdatedTo()
                        )
                );
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return taskRepository.findAll(specification, pageable);
    }
}
