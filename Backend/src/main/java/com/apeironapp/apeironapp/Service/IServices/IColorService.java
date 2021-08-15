package com.apeironapp.apeironapp.Service.IServices;

import com.apeironapp.apeironapp.DTO.ColorDTO;
import com.apeironapp.apeironapp.DTO.ItemInOrderDTO;
import com.apeironapp.apeironapp.Model.Colors;
import com.apeironapp.apeironapp.Model.ItemInOrder;

import java.util.List;

public interface IColorService {
    List<Colors> findAll ();
    Colors save(ColorDTO colorDTO);
    Colors findById(Integer id);
    void delete(Colors colors);

}
