package com.bus.bookmybus.dto;

public class BookingRequest {
    private Long busId;
    private String name;
    private String email;
    private int seats;

    public Long getBusId() { return busId; }
    public void setBusId(Long busId) { this.busId = busId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public int getSeats() { return seats; }
    public void setSeats(int seats) { this.seats = seats; }
}
