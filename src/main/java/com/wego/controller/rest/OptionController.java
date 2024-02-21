package com.wego.controller.rest;

import com.wego.dto.menu.MenuOptionCategoryDTO;
import com.wego.dto.menu.MenuOptionDTO;
import com.wego.dto.store.StoreDTO;
import com.wego.service.store.menu.OptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/option")
public class OptionController {

    private final OptionService optionService;

    @GetMapping("/categoryJoin/{categoryName}")
    public void option_category_join(@PathVariable String categoryName, @AuthenticationPrincipal StoreDTO storeDTO) {
        optionService.join_option_category(categoryName, storeDTO.getStoreId());
    }

    @GetMapping("/categorys")
    public List<MenuOptionCategoryDTO> get_option_category(@AuthenticationPrincipal StoreDTO storeDTO) {
        return optionService.get_option_category(storeDTO);
    }

    @PatchMapping("/modify")
    public void option_modify(@RequestBody MenuOptionDTO menuOptionDTO) {
        optionService.modify_option(menuOptionDTO);
    }

    @DeleteMapping("/delete/{optionId}")
    public void option_delete(@PathVariable int optionId) {
        optionService.delete_option(optionId);
    }

    @PostMapping("/join")
    public void option_join(@RequestBody List<MenuOptionDTO> menuOptions) {
        System.out.println(menuOptions);
        optionService.join_option(menuOptions);
    }

    @GetMapping("/category/{categoryId}")
    public MenuOptionCategoryDTO one_option_info(@PathVariable int categoryId) {
        System.out.println(categoryId);
        return optionService.one_option_category_info(categoryId);
    }

    @DeleteMapping("/category/delete/{categoryId}")
    public void option_category_delete(@PathVariable int categoryId) {
        optionService.delete_option_category(categoryId);
    }

}
