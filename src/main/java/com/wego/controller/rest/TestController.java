package com.wego.controller.rest;

import com.wego.dto.menu.MenuDTO;
import net.coobird.thumbnailator.Thumbnailator;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.Future;

@Controller
public class TestController {
    private final String UP_LOAD_PATH = "C:\\imgs";


    @PostMapping("/test")
    public void uploadTest(String url, MultipartFile[] imgs) throws UnsupportedEncodingException {
//        System.out.println(url);
        System.out.println("encoding : " + URLEncoder.encode(url, "UTF-8"));
        System.out.println("decoding : " + URLDecoder.decode(url, "UTF-8"));
//        System.out.println(imgs);
        List<Future<MenuDTO>> futureMenu = new ArrayList<>();
//        URLEncoder.encode(url, )




//        for (MultipartFile img : imgs) {
//            System.out.println("---------------------");
//            System.out.println("upload file name: " + img.getOriginalFilename());
//            System.out.println("upload file size: " + img.getSize());
//            String[] imgInfo = img.getOriginalFilename().split("\\.");
//            String imgName = imgInfo[0]; // 파일이름
//            String imgFormat = imgInfo[1]; // 파일 형식 (ex jpg, png 등)
//
//            System.out.println(imgName);
//            System.out.println(imgFormat);
//
//            File saveFile = new File(UP_LOAD_PATH, Objects.requireNonNull(img.getOriginalFilename()));
//
//            try {
//                img.transferTo(saveFile);
//                Thumbnails.of(saveFile)
//                        .size(100,100)
//                        .outputFormat("png")
//                        .toFile(UP_LOAD_PATH + "/thm_" + imgName);
//            } catch (Exception e) {
//                System.out.println(e);
//            }
//
//
//        }
    }

//    public File toFile(MultipartFile file) throws IOException {
//
//        File fileResult = new File(file.getOriginalFilename());
//        file.transferTo(fileResult);
//
//        return fileResult;
//    }
}
