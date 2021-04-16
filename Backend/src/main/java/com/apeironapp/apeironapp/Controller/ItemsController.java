package com.apeironapp.apeironapp.Controller;

import com.apeironapp.apeironapp.DTO.ItemDTO;
import com.apeironapp.apeironapp.DTO.NewAvailableColorsDTO;
import com.apeironapp.apeironapp.DTO.NewAvailableSizesDTO;
import com.apeironapp.apeironapp.DTO.NewItemDTO;
import com.apeironapp.apeironapp.Model.AvailableColors;
import com.apeironapp.apeironapp.Model.AvailableSize;
import com.apeironapp.apeironapp.Model.Item;
import com.apeironapp.apeironapp.Service.Implementations.CustomUserDetailsService;
import com.apeironapp.apeironapp.Service.Implementations.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/items", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ItemsController {


    @Autowired
    private ItemService itemService;

    @PostMapping("/add")
    // @PreAuthorize("hasRole('PHARMACIST')")
    public ResponseEntity<String> addItem(@RequestBody NewItemDTO newItemDTO) {

        Item item = itemService.save(newItemDTO);

        return item == null ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                new ResponseEntity<>("Item is successfully added!", HttpStatus.CREATED);
    }

    @GetMapping("/tshirt-women")
    // @PreAuthorize("hasRole('PHARMACIST')")
    public ResponseEntity<List<ItemDTO>> tshirtWomen() {

        List<Item> itemList = itemService.findAll();
        List<ItemDTO> womenTShirt = new ArrayList<ItemDTO>();
        for(Item item: itemList){
            if(item.getGender().equals("Female") && item.getType().equals("T-Shirt")){
                ItemDTO itemDTO = new ItemDTO();
                itemDTO.setId(item.getId());
                itemDTO.setGender(item.getGender());
                itemDTO.setName(item.getName());
                itemDTO.setPrice(item.getPrice());
                itemDTO.setType(item.getType());

                List<NewAvailableColorsDTO> newAvailableColorsDTOlist = new ArrayList<NewAvailableColorsDTO>();

                for(AvailableColors availableColors: item.getAvailableColors()) {
                    NewAvailableColorsDTO newAvailableColorsDTO = new NewAvailableColorsDTO();
                    newAvailableColorsDTO.setColor(availableColors.getColor());
                    newAvailableColorsDTO.setQuantity(availableColors.getQuantity());



                    List<NewAvailableSizesDTO> newAvailableSizesDTOS = new ArrayList<NewAvailableSizesDTO>();


                    for(AvailableSize availableSize: availableColors.getAvailableSizes()){
                        NewAvailableSizesDTO newAvailableSizesDTO = new NewAvailableSizesDTO();
                        newAvailableSizesDTO.setSize(availableSize.getSize());
                        newAvailableSizesDTO.setQuantity(availableSize.getQuantity());
                        newAvailableSizesDTOS.add(newAvailableSizesDTO);
                    }

                    newAvailableColorsDTO.setSizes(newAvailableSizesDTOS);
                    newAvailableColorsDTOlist.add(newAvailableColorsDTO);
                }



                itemDTO.setColors(newAvailableColorsDTOlist);








                womenTShirt.add(itemDTO);
            }
        }

        System.out.println(womenTShirt);

        return womenTShirt == null ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                ResponseEntity.ok(womenTShirt);
    }

}