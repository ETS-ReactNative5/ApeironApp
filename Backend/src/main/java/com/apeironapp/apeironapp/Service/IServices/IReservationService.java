package com.apeironapp.apeironapp.Service.IServices;

import com.apeironapp.apeironapp.DTO.NewItemDTO;
import com.apeironapp.apeironapp.DTO.NewOrderDTO;
import com.apeironapp.apeironapp.Model.Item;
import com.apeironapp.apeironapp.Model.Order;

import java.util.List;

public interface IReservationService {
    List<Order> findAll ();
    Order save(NewOrderDTO newOrderDTO);
    Order findById(Integer id);
    void delete(Order order);
}
