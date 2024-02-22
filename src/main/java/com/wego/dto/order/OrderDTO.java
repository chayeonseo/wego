package com.wego.dto.order;

import com.wego.dto.menu.MenuDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class OrderDTO {
    private int orderId;
    private int tableId;
    private int memberId;
    private int orderTotalPrice;
    private int storeId;
    private int orderStatus;
    private int orderComplete;
    private String orderRequest;
    private int orderCookTime;
    private int payMethod;
    private String payDate;
    private String createdDate;
    private String modifiedDate;

//    List<OrderMenuDTO> orderMenus;
    List<MenuDTO> menus;

}
