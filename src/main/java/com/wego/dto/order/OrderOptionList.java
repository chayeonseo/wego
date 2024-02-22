package com.wego.dto.order;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class OrderOptionList {
    private int orderOptionListId;
    private int orderMenuId;
    private int optionId;
    private String createDate;
}
