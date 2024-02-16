package com.wego.controller.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wego.dto.menu.MenuCategoryDTO;
import com.wego.dto.menu.MenuDTO;
import com.wego.dto.store.StoreDTO;
import com.wego.service.store.menu.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @GetMapping("/menu/{menuId}")
    public List<MenuCategoryDTO> get_menu(@AuthenticationPrincipal StoreDTO storeDTO, @PathVariable("menuId") int menuId) {
        return menuService.one_menu_all_info(storeDTO, menuId);
    }

}
