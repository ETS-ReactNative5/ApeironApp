package com.apeironapp.apeironapp.Service.Implementations;

import com.apeironapp.apeironapp.DTO.ColorDTO;
import com.apeironapp.apeironapp.Model.Colors;
import com.apeironapp.apeironapp.Repository.ColorsRepository;
import com.apeironapp.apeironapp.Service.IServices.IColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorService implements IColorService {


    @Autowired
    private ColorsRepository colorsRepository;


    @Override
    public List<Colors> findAll() {
        return colorsRepository.findAll();
    }

    @Override
    public Colors save(ColorDTO colorDTO) {
        Colors colors = new Colors();
        colors.setColor(colorDTO.getColor());

        return colorsRepository.save(colors);
    }



    @Override
    public Colors findById(Integer id) {
        return colorsRepository.findById(id).get();
    }

    @Override
    public void delete(Colors colors) {
        colorsRepository.delete(colors);
    }
}
