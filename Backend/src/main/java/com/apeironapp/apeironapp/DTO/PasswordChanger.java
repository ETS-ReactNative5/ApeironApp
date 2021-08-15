package com.apeironapp.apeironapp.DTO;

public class PasswordChanger {

    public String oldPassword;
    public String newPassword;

    public PasswordChanger() {
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
