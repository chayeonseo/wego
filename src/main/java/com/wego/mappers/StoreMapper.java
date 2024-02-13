package com.wego.mappers;


import com.wego.dto.store.StoreDTO;
import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface StoreMapper {

    StoreDTO test();

    // 1주 단위 요일별 매출
    List<Map<String, String>> get_week_total_price(@Param("mon") String mon, @Param("sun") String sun);

    // 1주 단위 요일별 주문수
    List<Map<String, String>> get_week_total_count(@Param("mon") String mon, @Param("sun") String sun);

    // 1달 단위 주문 상태
    List<Map<String, Integer>> get_order_status();
}
