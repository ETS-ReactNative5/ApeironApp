package com.apeironapp.apeironapp.Repository;

import com.apeironapp.apeironapp.Model.Item;
import com.apeironapp.apeironapp.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Order, Integer> {
}
