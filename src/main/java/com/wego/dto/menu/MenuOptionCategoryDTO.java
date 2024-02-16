package com.wego.dto.menu;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MenuOptionCategoryDTO {
    private int menuOptionCategoryId;
    private int menuId;
    private String menuOptionCategoryName;
    private int menuOptionCategoryNumber;
    private int menuOptionCategoryStoreId;
    private String createdDate;
    private String modifiedDate;

    List<MenuOptionDTO> menuOptions;
}
