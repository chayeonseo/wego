package com.wego.service.store.menu;

import com.wego.dto.menu.MenuCategoryDTO;
import com.wego.dto.menu.MenuDTO;
import com.wego.dto.store.StoreDTO;
import com.wego.mappers.MenuMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.catalina.Store;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
public class MenuService {

    private final MenuMapper menuMapper;



    public List<MenuCategoryDTO> one_menu_all_info(StoreDTO storeDTO, int menuId) {
        List<MenuCategoryDTO> categorys = menuMapper.get_all_menu_category(storeDTO);
        categorys.get(0).setMenus(Collections.singletonList(menuMapper.one_menu_all_info(menuId)));
        categorys.get(0).getMenus().get(0).setMenuOptionCategorys(menuMapper.get_all_menu_option_category(storeDTO));
        return categorys;
    }

    public List<MenuCategoryDTO> get_all_menu(StoreDTO storeDTO) {
        return menuMapper.get_all_menu(storeDTO);
    }
}
