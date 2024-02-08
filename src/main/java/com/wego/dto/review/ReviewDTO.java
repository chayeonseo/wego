package com.wego.dto.review;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ReviewDTO {
    private int reviewId;
    private int storeId;
    private int menuId;
    private String memberId;
    private String reviewTags;
    private LocalDateTime createdDate;
}
