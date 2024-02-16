package com.wego.controller.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wego.dto.menu.MenuDTO;
import com.wego.service.store.menu.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @GetMapping("/menu/{menuId}")
    public MenuDTO get_menu(@PathVariable("menuId") int menuId) {
        System.out.println(menuId);
        System.out.println(menuService.one_menu_all_info(menuId));
        return menuService.one_menu_all_info(menuId);
    }

}
