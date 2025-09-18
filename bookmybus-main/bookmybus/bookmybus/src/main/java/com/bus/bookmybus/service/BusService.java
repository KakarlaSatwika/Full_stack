package com.bus.bookmybus.service;

import com.bus.bookmybus.model.Bus;
import com.bus.bookmybus.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class BusService {

    @Autowired
    private BusRepository busRepository;

    public List<Bus> search(String origin, String destination, LocalDate date) {
        return busRepository.findByOriginAndDestinationAndTravelDate(origin, destination, date);
    }

    public Bus save(Bus bus) { return busRepository.save(bus); }

    public List<Bus> findAll() { return busRepository.findAll();
     }

     public Bus findById(Long id) {
    return busRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Bus not found with id " + id));
}

public Bus update(Long id, Bus updatedBus) {
    Bus existing = busRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Bus not found with id " + id));

    existing.setName(updatedBus.getName());
    existing.setOrigin(updatedBus.getOrigin());
    existing.setDestination(updatedBus.getDestination());
    existing.setTravelDate(updatedBus.getTravelDate());
    existing.setDepartureTime(updatedBus.getDepartureTime());
    existing.setArrivalTime(updatedBus.getArrivalTime());
    existing.setTotalSeats(updatedBus.getTotalSeats()); 
    existing.setAvailableSeats(updatedBus.getAvailableSeats()); 
    existing.setFare(updatedBus.getFare());

    return busRepository.save(existing);
}

public void delete(Long id) {
    if (!busRepository.existsById(id)) {
        throw new RuntimeException("Bus not found");
    }
    busRepository.deleteById(id);
}
    
}
