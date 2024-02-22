package com.wego.mappers;

import com.wego.dto.order.OrderDTO;
import com.wego.dto.store.StoreDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderMapper {
    List<OrderDTO> store_all_order(StoreDTO storeDTO);
}
