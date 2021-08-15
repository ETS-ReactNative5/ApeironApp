package com.apeironapp.apeironapp.Repository;

import com.apeironapp.apeironapp.Model.ItemInOrder;
import com.apeironapp.apeironapp.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemInOrderRepository extends JpaRepository<ItemInOrder, Integer> {
}
