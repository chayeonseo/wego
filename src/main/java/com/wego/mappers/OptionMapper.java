package com.wego.mappers;

import com.wego.dto.menu.MenuCategoryDTO;
import com.wego.dto.menu.MenuOptionCategoryDTO;
import com.wego.dto.menu.MenuOptionDTO;
import com.wego.dto.store.StoreDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OptionMapper {

    List<MenuOptionCategoryDTO> get_store_option_info(StoreDTO storeDTO);

    List<MenuOptionCategoryDTO> get_option_category(StoreDTO storeDTO);

    void join_option_category(@Param("categoryName") String categoryName,@Param("storeId") int storeId);

    void modify_option(MenuOptionDTO menuOptionDTO);

    void delete_option(int optionId);

    void join_option(@Param("menuOptions") List<MenuOptionDTO> menuOptions);

    MenuOptionCategoryDTO one_category_info(int optionCategoryId);

    void delete_option_category(int categoryId);

}
