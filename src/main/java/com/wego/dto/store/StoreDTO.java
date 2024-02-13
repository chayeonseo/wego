package com.wego.dto.store;


import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class StoreDTO implements UserDetails {
    // 기본 테이블 정보
    private int storeId;
    private String mbId;
    private String mbPw;
    private String store;
    private String category;
    private int open; // boolean 처럼 쓰려고 int?
    private int takeout; // boolean 처럼 쓰려고 int?
    private int wating; // ???
    private String tags;
    private int status;
    private String menuCategory;
    private String storeCategoryId;
    private int coupon;

    // store에 FK 연결된 table
    private StoreIntroDTO storeIntro;
    private StoreOpenInfoDTO storeOpenInfo;
    private List<StoreImgDTO> storeImgs;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return this.mbPw;
    }

    @Override
    public String getUsername() {
        return this.mbId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}