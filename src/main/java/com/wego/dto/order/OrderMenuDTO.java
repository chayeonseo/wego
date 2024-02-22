package com.wego.dto.order;

import com.wego.dto.menu.MenuOptionDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class OrderMenuDTO {
    private int orderMenuId;
    private int storeId;
    private int orderId;
    private int menuId;
    private int orderMenuAmount;
    private String payTime;
    private String createdDate;
    private String modifiedDate;

    List<MenuOptionDTO> menuOptions;
}
