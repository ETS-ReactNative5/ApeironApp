package com.apeironapp.apeironapp.Service.Implementations;

import com.apeironapp.apeironapp.DTO.NewAvailableSizesDTO;
import com.apeironapp.apeironapp.Model.AvailableColors;
import com.apeironapp.apeironapp.Model.AvailableSize;
import com.apeironapp.apeironapp.Repository.AvailableColorsRepository;
import com.apeironapp.apeironapp.Repository.AvailableSizesRepository;
import com.apeironapp.apeironapp.Service.IServices.IAvailableSizesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvailableSizesService implements IAvailableSizesService {

    @Autowired
    private AvailableSizesRepository availableSizesRepository;

    @Autowired
    private AvailableColorsService availableColorsService;

    @Override
    public List<AvailableSize> findAll() {
        return availableSizesRepository.findAll();
    }

    @Override
    public AvailableSize save(NewAvailableSizesDTO availableSizesDTO) {
        AvailableSize availableSize = new AvailableSize();
        availableSize.setSize(availableSizesDTO.getSize());
        AvailableColors availableColors = availableColorsService.findById(availableSizesDTO.getAvailableColorsId());
        availableSize.setAvailableColors(availableColors);
        availableSize.setQuantity(availableSizesDTO.getQuantity());
        return availableSizesRepository.save(availableSize);
    }

    @Override
    public AvailableSize findById(Integer id) {
        return availableSizesRepository.findById(id).get();
    }
}
