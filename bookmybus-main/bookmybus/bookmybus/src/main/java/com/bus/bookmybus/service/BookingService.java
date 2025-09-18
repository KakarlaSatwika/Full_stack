
package com.bus.bookmybus.service;

import com.bus.bookmybus.model.Bus;
import com.bus.bookmybus.model.Booking;
import com.bus.bookmybus.repository.BookingRepository;
import com.bus.bookmybus.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepo;
    @Autowired
    private BusRepository busRepo;

    @Transactional
    public Booking createBooking(Long busId, String name, String email, int seats) {
        Bus bus = busRepo.findById(busId)
                .orElseThrow(() -> new RuntimeException("Bus not found"));
        if (bus.getAvailableSeats() < seats) {
            throw new RuntimeException("Not enough seats available");
        }
        bus.setAvailableSeats(bus.getAvailableSeats() - seats);
        busRepo.save(bus);

        Booking booking = new Booking();
        booking.setBus(bus);
        booking.setPassengerName(name);
        booking.setPassengerEmail(email);
        booking.setSeatsBooked(seats);
        booking.setTotalFare(seats * bus.getFare());
        booking.setBookingTime(LocalDateTime.now());
        return bookingRepo.save(booking);
    }

    public List<Booking> allBookings() { return bookingRepo.findAll(); }
}
