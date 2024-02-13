package com.wego.dto.review;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ReviewImgDTO {
    private int reviewImgId;
    private int reviewId;
    private String reviewimgName;
    private int reviewNumber; // 뭐에 쓰려고 있는건지?
    private String reviewimgOriginal;
    private String reviewimgThm;
    private String createdDate;
    private String modifiedDate;
}
