package com.wego.dto.store;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class StoreOpenInfoDTO {
    private int openId;
    private int storeId;
    private String dayOfWeek;
    private String openTime;
    private String closeTime;
    private String createdDate;
    private String modifiedDate;

}
