package com.apeironapp.apeironapp.Service.Implementations;

import com.apeironapp.apeironapp.DTO.NewPictureDTO;
import com.apeironapp.apeironapp.Model.Item;
import com.apeironapp.apeironapp.Model.Pictures;
import com.apeironapp.apeironapp.Repository.PicturesRepository;
import com.apeironapp.apeironapp.Service.IServices.IPicturesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PicturesService implements IPicturesService {


    @Autowired
    private PicturesRepository picturesRepository;


    @Autowired
    private ItemService itemService;

    @Override
    public List<Pictures> findAll() {
        return picturesRepository.findAll();
    }

    @Override
    public Pictures save(NewPictureDTO newPictureDTO) {
        Pictures pictures = new Pictures();
        Item item = itemService.findById(newPictureDTO.getItemId());
        pictures.setItem(item);
        pictures.setPicByte(newPictureDTO.getPicByte());
        pictures.setName(newPictureDTO.getName());

        return picturesRepository.save(pictures);
    }

    @Override
    public Pictures findById(Integer id) {
        return picturesRepository.findById(id).get();
    }
}
