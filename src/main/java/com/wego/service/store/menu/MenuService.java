package com.wego.service.store.menu;

import com.wego.dto.menu.MenuCategoryDTO;
import com.wego.dto.menu.MenuDTO;
import com.wego.dto.store.StoreDTO;
import com.wego.mappers.MenuMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.catalina.Store;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
public class MenuService {

    private final MenuMapper menuMapper;



    public MenuDTO one_menu_all_info(int menuId) {
        return menuMapper.one_menu_all_info(menuId);
    }

    public List<MenuCategoryDTO> get_all_menu(StoreDTO storeDTO) {
        return menuMapper.get_all_menu(storeDTO);
    }
}
