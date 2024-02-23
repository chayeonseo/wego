package com.wego.service.store.menu;

import com.wego.dto.menu.MenuCategoryDTO;
import com.wego.dto.menu.MenuDTO;
import com.wego.dto.menu.MenuImgDTO;
import com.wego.dto.menu.MenuOptionCategoryDTO;
import com.wego.dto.store.StoreDTO;
import com.wego.mappers.MenuMapper;
import com.wego.mappers.StoreMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.catalina.Store;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
@Log4j2
@RequiredArgsConstructor
public class MenuService {

    private final String UP_LOAD_PATH = "/Users/leejaeho/Documents/upload";
    private final int WIDTH = 150;
    private final int HEIGHT = 150;

    private final MenuMapper menuMapper;


    public List<MenuCategoryDTO> one_menu_all_info(StoreDTO storeDTO, int menuId) {
        List<MenuCategoryDTO> categorys = menuMapper.get_all_menu_category(storeDTO);

        List<MenuDTO> resultMenu = new ArrayList<>();
        resultMenu.add(MenuDTO.builder().menuOptionCategorys(menuMapper.one_menu_option_category(menuId)).build());
        resultMenu.add(menuMapper.one_menu_all_info(menuId));

        categorys.get(0).setMenus(resultMenu);
        categorys.get(0).getMenus().get(0).setMenuOptionCategorys(menuMapper.get_all_menu_option_category(storeDTO));
        categorys.get(0).getMenus().get(1).setMenuOptionCategorys(menuMapper.one_menu_option_category(menuId));
        return categorys;
    }

    public List<MenuCategoryDTO> get_all_menu(StoreDTO storeDTO) {
        return menuMapper.get_all_menu(storeDTO);
    }

    @Transactional
    public void menu_modify(MenuDTO menuDTO) {
        menuMapper.menu_modify(menuDTO);
        if (!menuDTO.getMenuOptionCategorys().isEmpty()) {
            menuMapper.menu_option_modify(menuDTO);

        }
    }

    public void menu_option_connect_delete(int optionCategoryId, int menuId) {
        menuMapper.delete_menu_option_category(optionCategoryId, menuId);
    }


    public List<MenuCategoryDTO> get_category(int storeId) {
        return menuMapper.get_category(storeId);
    }

    @Transactional
    public void menu_join(MenuDTO menuDTO, MultipartFile multipartFile) throws IOException {
        for (MenuImgDTO img : menuDTO.getMenuImgs()) {
            String originalFileName = img.getFile().getOriginalFilename();
            String ThumbnailFileName = originalFileName + "";



        }
//        210.123.135.183/uploadTest/대구 중구 동성로1길 46-4/thm/진진/닭다리살 소금구이(2~3)/1703250897055.jpg
        String uploadFileName = multipartFile.getOriginalFilename();

        File saveFile = new File(UP_LOAD_PATH, uploadFileName);


//        BufferedImage bf_img = ImageIO.read(saveFile);

        Thumbnails.of(saveFile)
                .size(WIDTH, HEIGHT)
                .toFile(saveFile);


        menuMapper.menu_join(menuDTO);

        if (!menuDTO.getMenuOptionCategorys().isEmpty()) {
            menuMapper.menu_option_insert(menuDTO);
        }

    }

    public void menu_number_update(List<MenuDTO> menus) {
        for (MenuDTO menu : menus) {
            menuMapper.menu_number_update(menu);
        }
    }

    public void menu_category_join(String menuCategoryName, int storeId) {
        menuMapper.menu_category_join(menuCategoryName, storeId);
    }

    public MenuCategoryDTO one_category_info(int categoryId) {
        return menuMapper.one_category_info(categoryId);
    }


}
