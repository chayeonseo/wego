package com.wego.dto.menu;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MenuCategoryDTO {
    private int menuCategoryId;
    private int storeId;
    private String menuCategoryName;
    private int menuCategoryNumber;
    private String createdDate;
    private String modifiedDate;

    private List<MenuDTO> menus;
}
