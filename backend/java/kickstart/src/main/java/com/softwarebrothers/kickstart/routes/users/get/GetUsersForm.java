package com.softwarebrothers.kickstart.routes.users.get;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class GetUsersForm {

    @NotNull
    @Min(18)
    private Integer tetete;

    public Integer getTetete() {
        return tetete;
    }
}
