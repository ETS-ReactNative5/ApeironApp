package com.apeironapp.apeironapp.Repository;

import com.apeironapp.apeironapp.Model.Authority;
import com.apeironapp.apeironapp.Model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository  extends JpaRepository<Item, Integer> {
    Item findByName(String name);
}
