package com.wego;

import com.wego.mappers.MenuMapper;
import com.wego.mappers.StoreMapper;
import com.wego.service.store.home.StoreService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class WegoApplicationTests {

    @Autowired
    StoreMapper storeMapper;

    @Autowired
    StoreService storeService;

    @Autowired
    MenuMapper menuMapper;

    @Autowired
    PasswordEncoder passwordEncoder;


    @Test
    void contextLoads() {
//        System.out.println(storeMapper.get_week_total_price("2024-01-01", "2024-02-20"));
//        System.out.println(storeMapper.get_week_total_price("2024-01-29", "2024-02-05"));
//        System.out.println(storeMapper.get_order_status());
//        System.out.println(passwordEncoder.encode("1234"));

//        System.out.println(storeMapper.test());
//        System.out.println(menuMapper.test());
        System.out.println(menuMapper.get_menu(35));

    }

}
