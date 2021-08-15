package com.apeironapp.apeironapp.Service.IServices;

import com.apeironapp.apeironapp.DTO.NewItemDTO;
import com.apeironapp.apeironapp.DTO.PersonUserDTO;
import com.apeironapp.apeironapp.Model.Item;
import com.apeironapp.apeironapp.Model.PersonUser;
import com.apeironapp.apeironapp.Model.RegisteredUser;

import java.util.List;

public interface IItemService {
    List<Item> findAll ();
    Item save(NewItemDTO newItemDTO);
    Item findById(Integer id);
    void delete(Integer id);
    Item update(Item item);
}
