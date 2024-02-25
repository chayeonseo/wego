package com.wego;

import com.wego.mappers.HomeMapper;
import com.wego.mappers.MenuMapper;
import com.wego.mappers.OptionMapper;
import com.wego.mappers.OrderMapper;
import com.wego.service.store.home.HomeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class WegoApplicationTests {

    @Autowired
    HomeMapper storeMapper;

    @Autowired
    HomeService homeService;

    @Autowired
    MenuMapper menuMapper;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    OptionMapper optionMapper;

    @Autowired
    OrderMapper orderMapper;





    @Test
    void contextLoads() {
//        System.out.println(storeMapper.get_week_total_price("2024-01-01", "2024-02-20"));
//        System.out.println(storeMapper.get_week_total_price("2024-01-29", "2024-02-05"));
//        System.out.println(storeMapper.get_order_status());
//        System.out.println(passwordEncoder.encode("1234"));

//        System.out.println(storeMapper.test());
//        System.out.println(menuMapper.test());
//        System.out.println(menuMapper.get_menu(35));
//        MenuDTO result = menuMapper.one_menu_all_info();
//        System.out.println(result.getMenuName());
//        System.out.println("사진 개수: "+result.getMenuImgs().size());
//        System.out.println("옵션 카테고리 개수: "+result.getMenuOptionCategorys().size());
//        System.out.println("카테고리에 옵션 개수: " +result.getMenuOptionCategorys().get(0).getMenuOptions().get(0));
//        System.out.println("카테고리에 옵션 개수: " +result.getMenuOptionCategorys().get(1).getMenuOptions().get(0));
//        System.out.println("카테고리에 옵션 개수: " +result.getMenuOptionCategorys().get(2).getMenuOptions().get(0));
//        System.out.println(menuMapper.get_store_option_info());
//        System.out.println(menuMapper.one_menu_all_info(37));
//        System.out.println(menuMapper.one_menu_option_category(35));

//        System.out.println(menuMapper.get_category(2));

//        System.out.println(optionMapper.one_category_info(23));
//        System.out.println(optionMapper.one_category_info(37));

//        System.out.println(orderMapper.store_all_order());

    }

}
