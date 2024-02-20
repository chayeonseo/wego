package com.wego.mappers;

import com.wego.dto.menu.MenuOptionCategoryDTO;
import com.wego.dto.store.StoreDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OptionMapper {

    List<MenuOptionCategoryDTO> get_store_option_info(StoreDTO storeDTO);


    void join_option_category(@Param("categoryName") String categoryName,@Param("storeId") int storeId);

}
