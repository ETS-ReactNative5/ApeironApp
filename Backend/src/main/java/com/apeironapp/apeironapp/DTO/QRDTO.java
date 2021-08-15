package com.apeironapp.apeironapp.DTO;

import java.util.Set;

public class QRDTO {
    private Set<String> files;

    private String user;

    public Set<String> getFiles() {
        return files;
    }

    public QRDTO() {
    }

    public void setFiles(Set<String> files) {
        this.files = files;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
}
