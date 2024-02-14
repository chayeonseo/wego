package com.wego.dto.menu;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MenuOptionDTO {
    private int optionId;
    private int categoryId;
    private String menuOptionName;
    private int menuOptionPrice;
    private int menuOptionTKPrice;
    private int menuOptionNumber;
    private String createdDate;
    private String modifiedDate;
}
