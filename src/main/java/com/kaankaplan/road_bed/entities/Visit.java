package com.kaankaplan.road_bed.entities;

import java.util.Date;
import java.util.List;

public class Visit {

    public House house;
    public List<Date> visitedDates;
    public int day;
    public double totalPrice;

    public Visit(House house, List<Date> visitedDates, int day, double totalPrice) {
        this.house = house;
        this.visitedDates = visitedDates;
        this.day = day;
        this.totalPrice = totalPrice;
    }
}
