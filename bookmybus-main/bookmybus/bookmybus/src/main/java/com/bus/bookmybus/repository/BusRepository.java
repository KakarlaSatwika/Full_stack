package com.bus.bookmybus.repository;

import com.bus.bookmybus.model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface BusRepository extends JpaRepository<Bus, Long> {
    List<Bus> findByOriginAndDestinationAndTravelDate(String origin,
                                                      String destination,
                                                      LocalDate travelDate);


                                                    }
