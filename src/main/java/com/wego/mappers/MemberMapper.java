package com.wego.mappers;

import com.wego.dto.store.StoreDTO;
import com.wego.dto.store.StoreDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    void join_member(StoreDTO storeDTO);
    void join_storeIntro(StoreDTO storeDTO);
}
