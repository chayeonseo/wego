package com.wego.controller.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wego.dto.menu.MenuCategoryDTO;
import com.wego.dto.menu.MenuDTO;
import com.wego.dto.store.StoreDTO;
import com.wego.service.store.menu.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/menu")
public class MenuController {

    private final MenuService menuService;

    // 하나의 모든 정보 조회
    @GetMapping("/{menuId}")
    public List<MenuCategoryDTO> get_menu(@AuthenticationPrincipal StoreDTO storeDTO, @PathVariable("menuId") int menuId) {
        return menuService.one_menu_all_info(storeDTO, menuId);
    }

    @GetMapping("/category")
    public List<MenuCategoryDTO> get_category(@AuthenticationPrincipal StoreDTO storeDTO) {
        return menuService.get_category(storeDTO.getStoreId());
    }


    // 하나의 메뉴 수정
    @PatchMapping("/update")
    public void menu_patch(@RequestBody MenuDTO menuDTO) {
        menuService.menu_modify(menuDTO);
    }

    // 메뉴에 옵션 connect 삭제
    @DeleteMapping("/{optionCategoryId}/{menuId}")
    public void delete_menu_option_category(@PathVariable("optionCategoryId") int optionCategoryId, @PathVariable("menuId") int menuId) {
        menuService.menu_option_connect_delete(optionCategoryId, menuId);
    }

}
