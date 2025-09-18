/* 
package com.bus.bookmybus.controller;

import com.bus.bookmybus.model.Bus;
import com.bus.bookmybus.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/buses")
@CrossOrigin(origins = "http://localhost:4200")
public class BusController {

    @Autowired
    private BusService service;

    @GetMapping("/search")
    public List<Bus> search(@RequestParam String origin,
                            @RequestParam String destination,
                            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return service.search(origin, destination, date);
    }

    @GetMapping
    public List<Bus> all() { return service.findAll(); }

    @PostMapping
    public Bus add(@RequestBody Bus bus) { return service.save(bus); }
   
    @GetMapping("/{id}")
public Bus getById(@PathVariable Long id) {
    return service.findById(id);
}

@PutMapping("/{id}")
public Bus update(@PathVariable Long id, @RequestBody Bus updatedBus) {
    return service.update(id, updatedBus);
}


}


*/


package com.bus.bookmybus.controller;

import com.bus.bookmybus.model.Bus;
import com.bus.bookmybus.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/buses")
@CrossOrigin(origins = "http://localhost:4200")
public class BusController {

    @Autowired
    private BusService service;

    // Search buses by origin, destination and date
    @GetMapping("/search")
    public List<Bus> search(@RequestParam String origin,
                            @RequestParam String destination,
                            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return service.search(origin, destination, date);
    }

    // Get all buses
    @GetMapping
    public List<Bus> all() {
        return service.findAll();
    }

    // Add a new bus
    @PostMapping
    public Bus add(@RequestBody Bus bus) {
        return service.save(bus);
    }

    // Get bus by ID
    @GetMapping("/{id}")
    public Bus getById(@PathVariable Long id) {
        return service.findById(id);
    }

    // Update bus (including totalSeats and availableSeats)
    @PutMapping("/{id}")
    public Bus update(@PathVariable Long id, @RequestBody Bus updatedBus) {
        
        
        return service.update(id, updatedBus);
    }

    @DeleteMapping("/{id}")
public void delete(@PathVariable Long id) {
    service.delete(id);
}

 
}
