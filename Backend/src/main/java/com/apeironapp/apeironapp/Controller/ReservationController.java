package com.apeironapp.apeironapp.Controller;


import com.apeironapp.apeironapp.DTO.NewItemDTO;
import com.apeironapp.apeironapp.DTO.NewOrderDTO;
import com.apeironapp.apeironapp.Model.Item;
import com.apeironapp.apeironapp.Model.Order;
import com.apeironapp.apeironapp.Service.Implementations.ItemService;
import com.apeironapp.apeironapp.Service.Implementations.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/reservations", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/add")
    // @PreAuthorize("hasRole('PHARMACIST')")
    public ResponseEntity<String> addReservation(@RequestBody NewOrderDTO newOrderDTO) {

       Order order = reservationService.save(newOrderDTO);

        return order == null ?
                new ResponseEntity<>(HttpStatus.NOT_FOUND) :
                new ResponseEntity<>("Item is successfully added!", HttpStatus.CREATED);
    }

}
