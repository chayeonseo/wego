package com.wego.service.store.menu;

import com.wego.dto.menu.MenuCategoryDTO;
import com.wego.dto.menu.MenuDTO;
import com.wego.dto.menu.MenuOptionCategoryDTO;
import com.wego.dto.store.StoreDTO;
import com.wego.mappers.MenuMapper;
import com.wego.mappers.StoreMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.catalina.Store;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Log4j2
@RequiredArgsConstructor
public class MenuService {

    private final MenuMapper menuMapper;


    public List<MenuCategoryDTO> one_menu_all_info(StoreDTO storeDTO, int menuId) {
        List<MenuCategoryDTO> categorys = menuMapper.get_all_menu_category(storeDTO);

        List<MenuDTO> resultMenu = new ArrayList<>();
        resultMenu.add(MenuDTO.builder().menuOptionCategorys(menuMapper.one_menu_option_category(menuId)).build());
        resultMenu.add(menuMapper.one_menu_all_info(menuId));

        categorys.get(0).setMenus(resultMenu);
        categorys.get(0).getMenus().get(0).setMenuOptionCategorys(menuMapper.get_all_menu_option_category(storeDTO));
        categorys.get(0).getMenus().get(1).setMenuOptionCategorys(menuMapper.one_menu_option_category(menuId));
        return categorys;
    }

    public List<MenuCategoryDTO> get_all_menu(StoreDTO storeDTO) {
        return menuMapper.get_all_menu(storeDTO);
    }

    @Transactional
    public void menu_modify(MenuDTO menuDTO) {
        menuMapper.menu_modify(menuDTO);
        if (!menuDTO.getMenuOptionCategorys().isEmpty()) {
            menuMapper.menu_option_insert(menuDTO);

        }
    }

    public void menu_option_connect_delete(int optionCategoryId, int menuId) {
        menuMapper.delete_menu_option_category(optionCategoryId, menuId);
    }


    public List<MenuCategoryDTO> get_category(int storeId) {
        return menuMapper.get_category(storeId);
    }

    public void menu_join(MenuDTO menuDTO) {
        menuMapper.menu_join(menuDTO);
        menuMapper.menu_option_insert(menuDTO);
    }



}
