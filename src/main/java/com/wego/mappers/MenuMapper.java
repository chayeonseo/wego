package com.wego.mappers;


import com.wego.dto.menu.MenuCategoryDTO;
import com.wego.dto.menu.MenuDTO;
import com.wego.dto.menu.MenuOptionCategoryDTO;
import com.wego.dto.store.StoreDTO;
import jdk.jfr.Category;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MenuMapper {

    List<MenuCategoryDTO> get_all_menu(StoreDTO storeDTO);

    List<MenuCategoryDTO> get_all_menu_category(StoreDTO storeDTO);
    List<MenuOptionCategoryDTO> get_all_menu_option_category(StoreDTO storeDTO);


    MenuDTO one_menu_all_info(int menuId);

    List<MenuCategoryDTO> get_store_option_info();

    List<MenuOptionCategoryDTO> one_menu_option_category(int menuId);

    void delete_menu_option_category(int optionCategoryId, int menuId);

    void menu_modify(MenuDTO menuDTO);
    void menu_option_insert(MenuDTO menuDTO);

}
