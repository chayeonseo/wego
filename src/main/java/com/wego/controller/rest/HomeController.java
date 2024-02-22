package com.wego.controller.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wego.dto.store.StoreDTO;
import com.wego.service.store.home.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/home")
public class HomeController {

    // 의존성
    private final HomeService homeService;

    //REST API

    // 주간 매출 차트
    @GetMapping("/price")
    public String get_week_order_price(@AuthenticationPrincipal StoreDTO storeDTO) throws JsonProcessingException {
        //지난주 매출
        Map<String, String> lastWeekPrice = homeService.get_last_week_total_price(storeDTO);
        //이번주 매출
        Map<String, String> thisWeekPrice = homeService.get_this_week_total_price(storeDTO);

        List<Map<String, String>> result = new ArrayList<>();
        result.add(lastWeekPrice);
        result.add(thisWeekPrice);

        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(result);
    }

    // 주간 주문건 차트
    @GetMapping("/order")
    public String get_week_order_count(@AuthenticationPrincipal StoreDTO storeDTO) throws JsonProcessingException {
        // 지난주 주문건
        Map<String, String> lastWeekCount = homeService.get_last_week_total_order(storeDTO);
        // 이번주 주문건
        Map<String, String> thisWeekCount = homeService.get_this_week_total_order(storeDTO);

        List<Map<String, String>> result = new ArrayList<>();
        result.add(lastWeekCount);
        result.add(thisWeekCount);

        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(result);
    }



    @GetMapping("/status")
    public String get_order_status(@AuthenticationPrincipal StoreDTO storeDTO) throws JsonProcessingException{
        Map<String, String> orderStatus = homeService.get_order_status(storeDTO);

        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(orderStatus);
    }


}
