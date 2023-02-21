package com.kaankaplan.road_bed.dtos;

import java.util.Date;
import java.util.List;

public record ReserveHouseRequest(
        String houseId,
        List<Date> datesForReserve,
        String tenantEmail,
        int day,
        double totalPrice
) {
}
