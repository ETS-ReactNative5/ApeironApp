package com.apeironapp.apeironapp.Controller;

import com.apeironapp.apeironapp.DTO.*;
import com.apeironapp.apeironapp.Model.AvailableColors;
import com.apeironapp.apeironapp.Model.AvailableSize;
import com.apeironapp.apeironapp.Model.Item;
import com.apeironapp.apeironapp.Model.Pictures;
import com.apeironapp.apeironapp.Service.Implementations.CustomUserDetailsService;
import com.apeironapp.apeironapp.Service.Implementations.ItemService;
import com.apeironapp.apeironapp.Service.Implementations.PicturesService;
import com.google.zxing.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/items", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ItemsController {

    @Autowired
    private PicturesService picturesService;

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

    @PostMapping("/upload")
    //@PreAuthorize("hasRole('PATIENT')")
    ResponseEntity<String> hello(@RequestParam("file") MultipartFile file) throws IOException {

                System.out.println("sgvsrgserg"+file);
                BufferedImage src = ImageIO.read(new ByteArrayInputStream(file.getBytes()));
                File destination = new File("src/main/resources/images/" + file.getOriginalFilename());
                ImageIO.write(src, "png", destination);


        return new ResponseEntity<>("Image is successfully added!", HttpStatus.CREATED);
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

        return womenTShirt == null ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                ResponseEntity.ok(womenTShirt);
    }

    @GetMapping("/tshirt-men")
    // @PreAuthorize("hasRole('PHARMACIST')")
    public ResponseEntity<List<ItemDTO>> tshirtMen() {

        List<Item> itemList = itemService.findAll();
        List<ItemDTO> menTShirt = new ArrayList<ItemDTO>();
        for(Item item: itemList){
            if(item.getGender().equals("Male") && item.getType().equals("T-Shirt")){
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

                menTShirt.add(itemDTO);
            }
        }

        return menTShirt == null ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                ResponseEntity.ok(menTShirt);
    }

    @GetMapping("/hoodies-women")
    // @PreAuthorize("hasRole('PHARMACIST')")
    public ResponseEntity<List<ItemDTO>> hoodiesWomen() {

        List<Item> itemList = itemService.findAll();
        List<ItemDTO> womenHoodies = new ArrayList<ItemDTO>();
        for(Item item: itemList){
            if(item.getGender().equals("Female") && item.getType().equals("Hoodie")){
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

                womenHoodies.add(itemDTO);
            }
        }

        return womenHoodies == null ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                ResponseEntity.ok(womenHoodies);
    }


    @GetMapping("/hoodies-men")
    // @PreAuthorize("hasRole('PHARMACIST')")
    public ResponseEntity<List<ItemDTO>> hoodiesMen() {

        List<Item> itemList = itemService.findAll();
        List<ItemDTO> menHoodies = new ArrayList<ItemDTO>();
        for(Item item: itemList){
            if(item.getGender().equals("Male") && item.getType().equals("Hoodie")){
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

                menHoodies.add(itemDTO);
            }
        }

        return menHoodies == null ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                ResponseEntity.ok(menHoodies);
    }


    @GetMapping("/hats")
    // @PreAuthorize("hasRole('PHARMACIST')")
    public ResponseEntity<List<ItemDTO>> hats() {

        List<Item> itemList = itemService.findAll();
        List<ItemDTO> menHoodies = new ArrayList<ItemDTO>();
        for(Item item: itemList){
            if(item.getGender().equals("Hat") && item.getType().equals("Hat")){
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

                menHoodies.add(itemDTO);
            }
        }

        return menHoodies == null ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                ResponseEntity.ok(menHoodies);
    }

}
