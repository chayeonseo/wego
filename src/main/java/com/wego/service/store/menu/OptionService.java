package com.wego.service.store.menu;

import com.wego.dto.menu.MenuOptionCategoryDTO;
import com.wego.dto.menu.MenuOptionDTO;
import com.wego.dto.store.StoreDTO;
import com.wego.mappers.OptionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OptionService {

    private final OptionMapper optionMapper;

    public void join_option_category(String categoryName, int StoreId) {
        optionMapper.join_option_category(categoryName, StoreId);
    }

    public List<MenuOptionCategoryDTO> get_store_option_info(StoreDTO storeDTO) {
        return optionMapper.get_store_option_info(storeDTO);
    }

    public List<MenuOptionCategoryDTO> get_option_category(StoreDTO storeDTO) {
        return optionMapper.get_option_category(storeDTO);
    }

    public void modify_option(MenuOptionDTO menuOptionDTO) {
        optionMapper.modify_option(menuOptionDTO);
    }

    public void delete_option(int optionId) {
        optionMapper.delete_option(optionId);
    }

    public void join_option(List<MenuOptionDTO> menuOptions) {
        optionMapper.join_option(menuOptions);
    }

    public MenuOptionCategoryDTO one_option_category_info(int categoryId) {
        return optionMapper.one_category_info(categoryId);
    }

    public void delete_option_category(int categoryId) {
        optionMapper.delete_option_category(categoryId);
    }
}
