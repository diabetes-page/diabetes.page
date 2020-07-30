package com.softwarebrothers.kickstart.routes.users.get;

import com.softwarebrothers.kickstart.models.User;
import org.springframework.web.bind.annotation.GetMapping;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class GetUsers {
    @PostMapping("/users")
    public List<User> serve(@Valid GetUsersForm form) {
        return Arrays.asList(new User(form.getTetete() != null ? "yes" : "no"), new User("test2"));
    }

    private void authorize() {

    }

    private void validate() {

    }

    private void perform() {

    }

    private void format() {

    }
}
