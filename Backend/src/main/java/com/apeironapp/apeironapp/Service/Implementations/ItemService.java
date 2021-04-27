package com.apeironapp.apeironapp.Service.Implementations;

import com.apeironapp.apeironapp.DTO.NewAvailableColorsDTO;
import com.apeironapp.apeironapp.DTO.NewAvailableSizesDTO;
import com.apeironapp.apeironapp.DTO.NewItemDTO;
import com.apeironapp.apeironapp.Model.AvailableColors;
import com.apeironapp.apeironapp.Model.AvailableSize;
import com.apeironapp.apeironapp.Model.Item;
import com.apeironapp.apeironapp.Repository.ItemRepository;
import com.apeironapp.apeironapp.Service.IServices.IAuthorityService;
import com.apeironapp.apeironapp.Service.IServices.IItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemService implements IItemService {


    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private AvailableColorsService availableColorsService;


    @Autowired
    private AvailableSizesService availableSizesService;

    @Override
    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    @Override
    public Item save(NewItemDTO newItemDTO) {
        Item item = new Item();
        item.setName(newItemDTO.getName());
        item.setPrice(newItemDTO.getPrice());
        item.setType(newItemDTO.getType());
        item.setGender(newItemDTO.getGender());



        Item item1 = itemRepository.save(item);

        AvailableColors availableColors1 = new AvailableColors();
        for(String color: newItemDTO.getColors()){

            String quantity = "";
            String col = "";

            String niz[] = color.split(",");
            col = niz[0];
            quantity = niz[1];


            NewAvailableColorsDTO availableColors = new NewAvailableColorsDTO();
            availableColors.setColor(col);
            availableColors.setQuantity(Integer.parseInt(quantity));
            availableColors.setItemId(item.getId());
            availableColors1 = availableColorsService.save(availableColors);



        }

        List<AvailableColors> availableColors = availableColorsService.findAll();
        for(String size: newItemDTO.getSizes()){

           AvailableColors availableColors2 = new AvailableColors();
            String quantity = "";
            String col = "";
            String si = "";

            String niz[] = size.split(",");
            col = niz[0];
            si = niz[1];
            quantity = niz[2];

            for(AvailableColors a : availableColors){

                if(a.getColor().equals(col)){
                    availableColors2 = a;
                }
            }



            NewAvailableSizesDTO availableSizesDTO = new NewAvailableSizesDTO();
            availableSizesDTO.setSize(si);
            availableSizesDTO.setQuantity(Integer.parseInt(quantity));
            availableSizesDTO.setAvailableColorsId(availableColors2.getId());
            AvailableSize availableSize = availableSizesService.save(availableSizesDTO);



        }



        return item1;
    }

    @Override
    public Item findById(Integer id) {
        return itemRepository.findById(id).get();
    }



}
