package com.apeironapp.apeironapp.Service.IServices;

import com.apeironapp.apeironapp.DTO.NewAvailableColorsDTO;
import com.apeironapp.apeironapp.DTO.NewAvailableSizesDTO;
import com.apeironapp.apeironapp.Model.AvailableColors;
import com.apeironapp.apeironapp.Model.AvailableSize;

import java.util.List;

public interface IAvailableSizesService {
    List<AvailableSize> findAll ();
    AvailableSize save(NewAvailableSizesDTO availableSizesDTO);
    AvailableSize findById(Integer id);
}
