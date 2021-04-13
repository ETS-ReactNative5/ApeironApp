package com.apeironapp.apeironapp.DTO;

import java.util.List;

public class UserTokenStateDTO {
	
    private String accessToken;
    private List<String> roles;
    private Long expiresIn;

    public UserTokenStateDTO() {
        this.accessToken = null;
        this.expiresIn = null;
    }

    public UserTokenStateDTO(String accessToken, long expiresIn, List<String> roles) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
        this.roles = roles;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
    
    public List<String> getRoles() {
        return roles;
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