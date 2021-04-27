package com.apeironapp.apeironapp.Repository;

import com.apeironapp.apeironapp.Model.Item;
import com.apeironapp.apeironapp.Model.Pictures;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PicturesRepository  extends JpaRepository<Pictures, Integer> {
}
