package com.wego.service.member;

import com.wego.dto.store.StoreDTO;
import com.wego.dto.store.StoreDTO;
import com.wego.mappers.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.catalina.Store;
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

    public boolean select_id(String id){
        String selectedId = memberMapper.select_id(id);
        if(selectedId == null){ // 조회된 아이디가 없음
            return true;
        }
        // 조회된 아이디가 있음
        return false;
    }

//    public void category_no(StoreDTO storeDTO) {
//        memberMapper.category_no(storeDTO);
//    }
}