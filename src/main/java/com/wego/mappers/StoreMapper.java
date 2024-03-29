package com.wego.mappers;


import com.wego.dto.review.ReviewDTO;
import com.wego.dto.store.StoreDTO;
import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface StoreMapper {

    StoreDTO get_all_store(String id);

    // 1주 단위 요일별 매출
    List<Map<String, String>> get_week_total_price(@Param("mon") String mon, @Param("sun") String sun);

    // 1주 단위 요일별 주문수
    List<Map<String, String>> get_week_total_count(@Param("mon") String mon, @Param("sun") String sun);

    // 1달 단위 주문 상태
    List<Map<String, Integer>> get_order_status();

    @Select("select * from review where reviewId = '18'")
    ReviewDTO test();
}
