/* 
package com.bus.bookmybus.controller;

import com.bus.bookmybus.dto.BookingRequest;
import com.bus.bookmybus.model.Booking;
import com.bus.bookmybus.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:4200")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public Booking book(@RequestBody BookingRequest req) {
        return bookingService.createBooking(
                req.getBusId(),
                req.getName(),
                req.getEmail(),
                req.getSeats());
    }

    @GetMapping
    public List<Booking> all() { return bookingService.allBookings(); }
}

*/

package com.bus.bookmybus.controller;

import com.bus.bookmybus.model.Booking;
import com.bus.bookmybus.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:4200")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> payload) {
        Long busId = Long.valueOf(payload.get("busId").toString());
        String name = payload.get("name").toString();
        String email = payload.get("email").toString();
        int seats = Integer.parseInt(payload.get("seats").toString());

        try {
            Booking booking = bookingService.createBooking(busId, name, email, seats);
            return ResponseEntity.ok(booking);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Booking> allBookings() {
        return bookingService.allBookings();
    }
}
