package com.wego.dto.store;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class StoreImgDTO {
    private int storeImgId;
    private int storeId;
    private int storeImgnum;
    private String storeImgName;
    private String storeImgOriginal;
    private String storeImgThm;


}
