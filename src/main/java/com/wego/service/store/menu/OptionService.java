package com.wego.service.store.menu;

import com.wego.dto.menu.MenuOptionCategoryDTO;
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
}
