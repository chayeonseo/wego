package com.wego.dto.store;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class StoreIntroDTO {
    private int storeIntroId;
    private int storeId;
    private String storeIntroInfo;
    private String storeIntroTel;
}
