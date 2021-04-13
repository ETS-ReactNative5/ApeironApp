package com.apeironapp.apeironapp.Service.Implementations;

import com.apeironapp.apeironapp.Model.Authority;
import com.apeironapp.apeironapp.Repository.AuthorityRepository;
import com.apeironapp.apeironapp.Service.IServices.IAuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorityService implements IAuthorityService {

    @Autowired
    private AuthorityRepository authorityRepository;

    @Override
    public Authority findById(Integer id) {
        Authority auth = this.authorityRepository.getOne(id);

        return auth;
    }

    @Override
    public Authority findByname(String name) {
        Authority auth = this.authorityRepository.findByName(name);
        return auth;
    }


}