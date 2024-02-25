package com.wego.controller.rest;

import net.coobird.thumbnailator.Thumbnailator;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

@Controller
public class TestController {
    private final String UP_LOAD_PATH = "/Users/leejaeho/Documents/upload";


    @PostMapping("/test")
    public void uploadTest(MultipartFile[] imgs) {
        for (MultipartFile img : imgs) {
            System.out.println("---------------------");
            System.out.println("upload file name: " + img.getOriginalFilename());
            System.out.println("upload file name: " + img.getSize());

            File saveFile = new File(UP_LOAD_PATH, Objects.requireNonNull(img.getOriginalFilename()));
            File filePath = new File(String.valueOf(saveFile));

            try {
                img.transferTo(saveFile);
                Thumbnails.of(saveFile)
                        .size(100,100)
                        .toFile(UP_LOAD_PATH + "/thm_" + img.getOriginalFilename());
            } catch (Exception e) {
                System.out.println(e);
            }


        }
    }

    public File toFile(MultipartFile file) throws IOException {

        File fileResult = new File(file.getOriginalFilename());
        file.transferTo(fileResult);

        return fileResult;
    }
}
