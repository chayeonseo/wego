package com.wego.controller.view;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wego.dto.store.StoreDTO;
import com.wego.service.store.home.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

// view 처리 controller
@Controller
public class ViewController {


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

}
