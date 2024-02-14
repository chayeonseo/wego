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

    public List<MenuCategoryDTO> get_test(StoreDTO storeDTO) {
        return menuMapper.test(storeDTO);
    }

    public MenuDTO get_menu(int menuId) {
        return menuMapper.get_menu(menuId);
    }

    public List<MenuDTO> get_all_menu(StoreDTO storeDTO) {
        return menuMapper.get_all_menu(storeDTO);
    }
}
