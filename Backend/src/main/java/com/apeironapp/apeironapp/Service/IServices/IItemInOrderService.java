package com.apeironapp.apeironapp.Service.IServices;

import com.apeironapp.apeironapp.DTO.ItemInOrderDTO;
import com.apeironapp.apeironapp.DTO.NewOrderDTO;
import com.apeironapp.apeironapp.Model.ItemInOrder;
import com.apeironapp.apeironapp.Model.Order;

import java.util.List;

public interface IItemInOrderService {
    List<ItemInOrder> findAll ();
    ItemInOrder save(ItemInOrderDTO newOrderDTO);
    ItemInOrder findById(Integer id);
}
