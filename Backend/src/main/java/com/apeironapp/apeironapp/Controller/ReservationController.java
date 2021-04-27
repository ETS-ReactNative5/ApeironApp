package com.apeironapp.apeironapp.Controller;


import com.apeironapp.apeironapp.DTO.*;
import com.apeironapp.apeironapp.Model.*;
import com.apeironapp.apeironapp.Service.Implementations.ItemInOrderService;
import com.apeironapp.apeironapp.Service.Implementations.ItemService;
import com.apeironapp.apeironapp.Service.Implementations.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/api/reservations", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;


    @Autowired
    private ItemService itemService;

    @PostMapping("/add")
    // @PreAuthorize("hasRole('PHARMACIST')")
    public ResponseEntity<String> addReservation(@RequestBody NewOrderDTO newOrderDTO) {

       Order order = reservationService.save(newOrderDTO);

        return order == null ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                new ResponseEntity<>("Item is successfully added!", HttpStatus.CREATED);
    }


    @GetMapping("/all")
    // @PreAuthorize("hasRole('PHARMACIST')")
    public ResponseEntity<List<ReservationDTO>> all() {

        List<Order> orders = reservationService.findAll();
        List<ReservationDTO> reservationDTOS = new ArrayList<ReservationDTO>();

        for (Order order : orders) {

                        ReservationDTO reservationDTO = new ReservationDTO();
                        reservationDTO.setReservationId(order.getId());
                        reservationDTO.setDateOfReservation(order.getDateOfReservation());
                        reservationDTO.setDueDate(order.getDueDate());
                        Set<ItemInOrderDTO> itemInOrderDTOSet = new HashSet<ItemInOrderDTO>();

                        for (ItemInOrder item : order.getItems()) {
                            ItemInOrderDTO item1 = new ItemInOrderDTO();
                            reservationDTO.setItemId(item.getId());
                            reservationDTO.setItemGender(item.getItem().getGender());
                            reservationDTO.setItemName(item.getItem().getName());
                            reservationDTO.setItemType(item.getItem().getType());
                            item1.setColor(item.getColor());
                            item1.setItemId(item.getId());
                            item1.setQuantity(item.getQuantity());
                            item1.setSize(item.getSize());
                            itemInOrderDTOSet.add(item1);


                        }
                        reservationDTO.setItemInOrderDTOSet(itemInOrderDTOSet);

                        if(reservationDTOS.contains(reservationDTO)){
                            break;
                        }else{
                            reservationDTOS.add(reservationDTO);
                        }



                    }


            return reservationDTOS == null ?
                    new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                    ResponseEntity.ok(reservationDTOS);
        }



    @GetMapping("/remove/{id}")
    // @PreAuthorize("hasRole('PHARMACIST')")
    public ResponseEntity<String> remove(@PathVariable Integer id) {

       Order order = reservationService.findById(id);
        reservationService.delete(order);

        return order == null ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                new ResponseEntity<>("Item is successfully deleted!", HttpStatus.CREATED);
    }

}
