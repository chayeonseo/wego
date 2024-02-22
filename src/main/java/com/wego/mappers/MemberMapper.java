package com.wego.mappers;

import com.wego.dto.store.StoreDTO;
import com.wego.dto.store.StoreDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    void join_member(StoreDTO storeDTO);
    void join_storeIntro(StoreDTO storeDTO);
    String select_id(String id); //중복 Id 검색

//    void category_no(StoreDTO storeDTO); // 메뉴 카테고리 번호
}
