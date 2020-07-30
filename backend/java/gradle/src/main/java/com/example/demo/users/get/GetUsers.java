package com.example.demo.users.get;

import com.example.demo.models.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GetUsers {
    @GetMapping("/users")
    public List<User> serve() {
        return List.of(new User("a", "b"), new User("x", "y"));
    }
}
