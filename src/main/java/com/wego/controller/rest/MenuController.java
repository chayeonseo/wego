package com.wego.controller.rest;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wego.dto.menu.MenuCategoryDTO;
import com.wego.dto.menu.MenuDTO;
import com.wego.dto.store.StoreDTO;
import com.wego.service.store.menu.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/menu")
public class MenuController {
    private final MenuService menuService;

    // 하나의 모든 정보 조회
    @GetMapping(value = "/{menuId}")
    public ResponseEntity<List<MenuCategoryDTO>> get_menu(@AuthenticationPrincipal StoreDTO storeDTO, @PathVariable("menuId") int menuId) {
        try {
            List<MenuCategoryDTO> menuList = menuService.one_menu_all_info(storeDTO, menuId);
            System.out.println("menuList : " + menuList);
            ObjectMapper objMapper = new ObjectMapper();
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            JsonGenerator jsonGenerator = objMapper.getFactory().createGenerator(byteArrayOutputStream);
            objMapper.writeValue(jsonGenerator, menuList);
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(HttpHeaders.CONTENT_LENGTH, String.valueOf(byteArrayOutputStream.size()));
            System.out.println("응답 완료.!");
            return ResponseEntity.status(HttpStatus.OK).headers(httpHeaders).body(menuList);
        }catch (IOException e){
            System.out.println("처리 중 오류 발생..: " + e);
        }
        // 500번 에러 전송
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    @GetMapping("/category")
    public List<MenuCategoryDTO> get_category(@AuthenticationPrincipal StoreDTO storeDTO) {
        return menuService.get_category(storeDTO.getStoreId());
    }

    // TODO 메뉴 카테고리 생성 아직 진행중
    @GetMapping("/categoryJoin/{categoryName}")
    public void menu_category_join(@PathVariable String categoryName, @AuthenticationPrincipal StoreDTO storeDTO) {
        System.out.println(categoryName);
//        optionService.join_option_category(categoryName, storeDTO.getStoreId());
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

    // 메뉴 insert
    @PostMapping("/join")
    public void join_menu(@RequestBody MenuDTO menuDTO) {
        menuService.menu_join(menuDTO);
    }

    @PatchMapping("/number")
    public void number_patch(@RequestBody List<MenuDTO> menus) {
        menuService.menu_number_update(menus);
    }




}
