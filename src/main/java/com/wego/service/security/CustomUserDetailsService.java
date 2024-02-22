package com.wego.service.security;

import com.wego.dto.store.StoreDTO;
import com.wego.mappers.StoreMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Log4j2
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final StoreMapper storeMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.warn("loadUserByUsername run");
        StoreDTO storeDTO = storeMapper.get_all_store(username);
//        System.out.println(storeDTO);

        if (Objects.isNull(storeDTO)) {
            throw new UsernameNotFoundException("username이 존재하지 않음 [" + username + "]");
        }

        log.warn(storeDTO);

        return storeDTO;
    }
}
