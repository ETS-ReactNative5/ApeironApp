package com.apeironapp.apeironapp.Service.Implementations;

import com.apeironapp.apeironapp.DTO.ItemInOrderDTO;
import com.apeironapp.apeironapp.Model.Item;
import com.apeironapp.apeironapp.Model.ItemInOrder;
import com.apeironapp.apeironapp.Repository.ItemInOrderRepository;
import com.apeironapp.apeironapp.Repository.ReservationRepository;
import com.apeironapp.apeironapp.Service.IServices.IItemInOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemInOrderService implements IItemInOrderService {

    @Autowired
    private ItemInOrderRepository itemInOrderRepository;


    @Autowired
    private ItemService itemService;

    @Override
    public List<ItemInOrder> findAll() {
        return itemInOrderRepository.findAll();
    }

    @Override
    public ItemInOrder save(ItemInOrderDTO newOrderDTO) {
        ItemInOrder item = new ItemInOrder();
        Item item1 = itemService.findById(newOrderDTO.getItemId());
        item.setItem(item1);
        item.setColor(newOrderDTO.getColor());
        item.setQuantity(newOrderDTO.getQuantity());
        item.setSize(newOrderDTO.getSize());

        return itemInOrderRepository.save(item);
    }

    @Override
    public ItemInOrder findById(Integer id) {
        return itemInOrderRepository.findById(id).get();
    }
}
