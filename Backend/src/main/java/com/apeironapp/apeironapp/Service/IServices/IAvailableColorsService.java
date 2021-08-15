package com.apeironapp.apeironapp.Service.IServices;

import com.apeironapp.apeironapp.DTO.NewAvailableColorsDTO;
import com.apeironapp.apeironapp.DTO.NewItemDTO;
import com.apeironapp.apeironapp.Model.AvailableColors;
import com.apeironapp.apeironapp.Model.Item;

import java.util.List;

public interface IAvailableColorsService {
    List<AvailableColors> findAll ();
    AvailableColors save(NewAvailableColorsDTO availableColorsDTO);
    AvailableColors findById(Integer id);
}
