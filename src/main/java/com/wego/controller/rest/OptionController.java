package com.wego.controller.rest;

import com.wego.dto.store.StoreDTO;
import com.wego.service.store.menu.OptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/option")
public class OptionController {

    private final OptionService optionService;

    @GetMapping("/categoryJoin/{categoryName}")
    public void option_category_join(@PathVariable String categoryName, @AuthenticationPrincipal StoreDTO storeDTO) {
        optionService.join_option_category(categoryName, storeDTO.getStoreId());
    }

    @GetMapping("/{optionId}")
    public void get_option_info(@PathVariable int optionId) {

    }
}
