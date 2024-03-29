package com.wego.dto.menu;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MenuImgDTO {
    private int menuImgId;
    private int storeId;
    private int menuId;
    private int menuImgNumber;
    private String menuImgFileName;
    private String menuImgFileExt;
    private String createdDate;
    private String menuImgcol;
    private String menuImgOriginal;
    private String menuImgThm;
    private String modifiedDate;

}
