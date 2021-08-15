package com.apeironapp.apeironapp.Service.Implementations;

import com.apeironapp.apeironapp.DTO.ItemInOrderDTO;
import com.apeironapp.apeironapp.DTO.NewOrderDTO;
import com.apeironapp.apeironapp.Model.*;
import com.apeironapp.apeironapp.Repository.CourirRepository;
import com.apeironapp.apeironapp.Repository.ItemRepository;
import com.apeironapp.apeironapp.Repository.RegisteredUserRepository;
import com.apeironapp.apeironapp.Repository.ReservationRepository;
import com.apeironapp.apeironapp.Service.IServices.IItemService;
import com.apeironapp.apeironapp.Service.IServices.IReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class ReservationService implements IReservationService {


    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private CourirRepository courirRepository;

    @Autowired
    private ItemInOrderService itemInOrderService;


    @Autowired
    private RegisteredUserRepository registeredUserRepository;

    @Override
    public List<Order> findAll() {
        return reservationRepository.findAll();
    }

    @Override
    public Order save(NewOrderDTO newOrderDTO) {

        Order order = new Order();
        RegisteredUser registeredUser = getLoggedUser();
        order.setRegisteredUser(registeredUser);
        order.setDateOfReservation(LocalDate.now());
        order.setDueDate(newOrderDTO.getDueDate());

        order.setStatus("CREATED");

        Set<ItemInOrder> items = new HashSet<ItemInOrder>();
        for(ItemInOrderDTO item: newOrderDTO.getItems()) {
            order.setItemId(item.getItemId());
            ItemInOrder itemInOrder = itemInOrderService.save(item);
            items.add(itemInOrder);
        }

        order.setItems(items);

        //order.setItems(newOrderDTO.getItems());


        return reservationRepository.save(order);
    }
    public RegisteredUser getLoggedUser() {

        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String email = currentUser.getName();
        return registeredUserRepository.findByEmail(email);

    }
    @Override
    public Order findById(Integer id) {
        return reservationRepository.findById(id).get();
    }

    @Override
    public void delete(Order order) {
        reservationRepository.delete(order);
    }

    @Override
    public Order update(Order order) {
        return reservationRepository.save(order);
    }
}
