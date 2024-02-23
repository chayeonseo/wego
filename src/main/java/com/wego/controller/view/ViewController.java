package com.wego.controller.view;

import com.wego.dto.store.StoreDTO;
import com.wego.service.store.order.OrderService;
import com.wego.service.store.menu.MenuService;
import com.wego.service.store.menu.OptionService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

// view 처리 controller
@Controller
@RequiredArgsConstructor
public class ViewController {

    private final MenuService menuService;
    private final OptionService optionService;
    private final OrderService orderService;

    @GetMapping("/test")
    public String test() {
        return "index";
    }


    @GetMapping("/menu")
    public String menu_view(@AuthenticationPrincipal StoreDTO storeDTO, Model model) {
        model.addAttribute("categorys", menuService.get_all_menu(storeDTO));
        System.out.println(menuService.get_all_menu(storeDTO));
//        System.out.println(menuService.get_all_menu(storeDTO));
        return "main/menu";
    }

    @GetMapping("/option")
    public String option_view(@AuthenticationPrincipal StoreDTO storeDTO, Model model) {
        model.addAttribute("categorys", optionService.get_store_option_info(storeDTO));
        return "main/option";
    }

    @GetMapping("/home")
    public String home_view(@AuthenticationPrincipal StoreDTO storeDTO, Model model) {
        //여기서 model로 메인을 던지자
        System.out.println("home_view : " + storeDTO);
        model.addAttribute("store", storeDTO);
        return "main/home";
    }

    @GetMapping("/review")
    public String review_view() {
        return "main/review";
    }

    @GetMapping("/user/login")
    public String login_view() {
        return "user/login";
    }

    @GetMapping("/user/logout")
    public String user_logout(HttpSession session) {
        session.invalidate();
        return "user/login";
    }

    @GetMapping("/order")
    public String order_view(@AuthenticationPrincipal StoreDTO storeDTO, Model model) {
        orderService.store_all_order(storeDTO);
        model.addAttribute("orders", orderService.store_all_order(storeDTO));
        return "main/order";
    }


}
