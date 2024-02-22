package com.wego.service.order;

import com.wego.dto.order.OrderDTO;
import com.wego.dto.store.StoreDTO;
import com.wego.mappers.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderMapper orderMapper;

    public List<OrderDTO> store_all_order(StoreDTO storeDTO){
        return orderMapper.store_all_order(storeDTO);
    }
}
