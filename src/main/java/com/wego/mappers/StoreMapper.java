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

    // 지난주 요일별 가격 List
    List<Map<String, String>> get_week_total_price(@Param("mon") String mon, @Param("sun") String sun);


    List<Map<String, String>> get_week_total_count(@Param("mon") String mon, @Param("sun") String sun);

}
