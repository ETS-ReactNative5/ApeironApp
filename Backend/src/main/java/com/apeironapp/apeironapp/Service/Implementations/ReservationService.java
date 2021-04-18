package com.apeironapp.apeironapp.Service.Implementations;

import com.apeironapp.apeironapp.DTO.ItemInOrderDTO;
import com.apeironapp.apeironapp.DTO.NewOrderDTO;
import com.apeironapp.apeironapp.Model.Item;
import com.apeironapp.apeironapp.Model.ItemInOrder;
import com.apeironapp.apeironapp.Model.Order;
import com.apeironapp.apeironapp.Repository.ItemRepository;
import com.apeironapp.apeironapp.Repository.ReservationRepository;
import com.apeironapp.apeironapp.Service.IServices.IItemService;
import com.apeironapp.apeironapp.Service.IServices.IReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ReservationService implements IReservationService {


    @Autowired
    private ReservationRepository reservationRepository;



    @Autowired
    private ItemInOrderService itemInOrderService;



    @Override
    public List<Order> findAll() {
        return reservationRepository.findAll();
    }

    @Override
    public Order save(NewOrderDTO newOrderDTO) {

        Order order = new Order();
        order.setDateOfReservation(LocalDate.now());
        order.setDueDate(newOrderDTO.getDueDate());

        Set<ItemInOrder> items = new HashSet<ItemInOrder>();
        for(ItemInOrderDTO item: newOrderDTO.getItems()) {
            ItemInOrder itemInOrder = itemInOrderService.save(item);
            items.add(itemInOrder);
        }

        order.setItems(items);

        //order.setItems(newOrderDTO.getItems());


        return reservationRepository.save(order);
    }

    @Override
    public Order findById(Integer id) {
        return reservationRepository.findById(id).get();
    }
}
