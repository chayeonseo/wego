package com.wego.service.member;

import com.wego.dto.store.StoreDTO;
import com.wego.dto.store.StoreDTO;
import com.wego.mappers.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@RequiredArgsConstructor
public class MemberService {
    @Autowired
    private MemberMapper memberMapper;

    public void join_member(StoreDTO storeDTO) {
        memberMapper.join_member(storeDTO);
        memberMapper.join_storeIntro(storeDTO);
    }
}