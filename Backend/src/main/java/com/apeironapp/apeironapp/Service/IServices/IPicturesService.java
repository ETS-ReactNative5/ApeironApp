package com.apeironapp.apeironapp.Service.IServices;

import com.apeironapp.apeironapp.DTO.NewItemDTO;
import com.apeironapp.apeironapp.DTO.NewPictureDTO;
import com.apeironapp.apeironapp.Model.Item;
import com.apeironapp.apeironapp.Model.Pictures;

import java.util.List;

public interface IPicturesService {
    List<Pictures> findAll ();
    Pictures save(NewPictureDTO newPictureDTO);
    Pictures findById(Integer id);
}
