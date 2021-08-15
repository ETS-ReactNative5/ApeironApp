package com.apeironapp.apeironapp.Model;

import java.util.List;

public class UserTokenState {

    private String accessToken;
    private Long expiresIn;
    private List<String> roles;

    public UserTokenState() {
        this.accessToken = null;
        this.expiresIn = null;
        this.roles = null;
    }

    public UserTokenState(String accessToken, Long expiresIn, List<String> roles) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
        this.roles = roles;
    }

    public UserTokenState(String accessToken, Long expiresIn) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }
}