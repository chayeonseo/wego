package com.wego.dto.menu;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MenuImgDTO {
    private MultipartFile file;
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
