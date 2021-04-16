package com.apeironapp.apeironapp.Service.Implementations;

import com.apeironapp.apeironapp.DTO.NewAvailableColorsDTO;
import com.apeironapp.apeironapp.Model.AvailableColors;
import com.apeironapp.apeironapp.Model.Item;
import com.apeironapp.apeironapp.Repository.AvailableColorsRepository;
import com.apeironapp.apeironapp.Repository.ItemRepository;
import com.apeironapp.apeironapp.Service.IServices.IAvailableColorsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvailableColorsService implements IAvailableColorsService {

    @Autowired
    private AvailableColorsRepository availableColorsRepository;

    @Autowired
    private ItemService itemService;

    @Override
    public List<AvailableColors> findAll() {
        return availableColorsRepository.findAll();
    }

    @Override
    public AvailableColors save(NewAvailableColorsDTO availableColorsDTO) {
        AvailableColors availableColors = new AvailableColors();
        Item item = itemService.findById(availableColorsDTO.getItemId());
        availableColors.setItem(item);
        availableColors.setColor(availableColorsDTO.getColor());
        availableColors.setQuantity(availableColorsDTO.getQuantity());


        return availableColorsRepository.save(availableColors);
    }

    @Override
    public AvailableColors findById(Integer id) {
        return availableColorsRepository.findById(id).get();
    }
}
