package com.apeironapp.apeironapp.Repository;

import com.apeironapp.apeironapp.Model.AvailableColors;
import com.apeironapp.apeironapp.Model.AvailableSize;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvailableSizesRepository extends JpaRepository<AvailableSize, Integer> {
}
