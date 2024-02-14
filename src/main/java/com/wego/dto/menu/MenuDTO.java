package com.wego.dto.menu;

import lombok.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MenuDTO {
    private int menuId;
    private int menuCategoryId;
    private String menuHashTag;
    private String menuName;
    private String menuContent;
    private int menuPrice;
    private int menuDiscountPrice;
    private int menuTkPrice;
    private int menuNumber; // 메뉴 순서 인덱스 겸용
    private int menuCookTime;
    private int menuType;
    private int menuStatus;
    private String createdDate;
    private String modifiedDate;

    // dto
    private List<MenuOptionCategoryDTO> menuOptionCategorys;
    private List<MenuImgDTO> menuImgs;
}
