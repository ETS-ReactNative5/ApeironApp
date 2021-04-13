package com.apeironapp.apeironapp.Service.IServices;

import com.apeironapp.apeironapp.Model.Authority;


public interface IAuthorityService {
    Authority findById(Integer id);
    Authority findByname(String name);

}