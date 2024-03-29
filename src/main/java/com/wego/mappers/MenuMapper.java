package com.wego.mappers;


import com.wego.dto.menu.MenuCategoryDTO;
import com.wego.dto.menu.MenuDTO;
import com.wego.dto.store.StoreDTO;
import jdk.jfr.Category;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MenuMapper {

    List<MenuCategoryDTO> test(StoreDTO storeDTO);

    List<MenuDTO> get_all_menu(StoreDTO storeDTO);

    MenuDTO get_menu(int menuId);

}
