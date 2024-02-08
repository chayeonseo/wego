package com.wego.service.store.home;

import com.wego.mappers.StoreMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Log4j2
@RequiredArgsConstructor
public class StoreService {
    
    ///////////////////////////////////////////// 의존성
    private final StoreMapper storeMapper;

    ///////////////////////////////////////////// 서비스 처리
    // 지난주 주간 매출 (일자별)
    public Map<String, String> get_last_week_total_price() {
        String[] thisWeekDays = last_week_days().split("//");
        String mon = thisWeekDays[0];
        String sun = thisWeekDays[1];

        List<Map<String, String>> results = storeMapper.get_week_total_price(mon, sun);

        return result_priceMap(results);
    }

    // 이번주 주간 매출 (일자별)
    public Map<String, String> get_this_week_total_price() {
        String[] thisWeekDays = this_week_days().split("//");
        String mon = thisWeekDays[0];
        String sun = thisWeekDays[1];

        List<Map<String, String>> results = storeMapper.get_week_total_price(mon, sun);

        return result_priceMap(results);
    }



    // 지난주 주문 건수 (요일별)
    public Map<String, String> get_last_week_total_order() {
        String[] lastWeekDays = last_week_days().split("//");
        String mon = lastWeekDays[0];
        String sun = lastWeekDays[1];

        List<Map<String, String>> results = storeMapper.get_week_total_count(mon, sun);

        return result_orderMap(results);
    }
    // 이번주 주문 건수 (요일별)
    public Map<String, String> get_this_week_total_order() {
        String[] thisWeekDays = this_week_days().split("//");
        String mon = thisWeekDays[0];
        String sun = thisWeekDays[1];

        List<Map<String, String>> results = storeMapper.get_week_total_count(mon, sun);

        return result_orderMap(results);
    }




    ////////////////////////////////// 부가적인 편의성
    // 받아온 값 Map<String, Integer> 타입으로 변환하기 (view사용 시 편의성)
    private Map<String, String> result_priceMap(List<Map<String, String>> results) {
        Map<String, String> resultMap = new HashMap<>();
        for (Map<String, String> result : results) {
            resultMap.put(result.get("day"), String.valueOf(result.get("totalPrice")));
        }
        return resultMap;
    }

    private Map<String, String> result_orderMap(List<Map<String, String>> results) {
        Map<String, String> resultMap = new HashMap<>();
        for (Map<String, String> result : results) {
            resultMap.put(result.get("day"), String.valueOf(result.get("count")));
        }
        return resultMap;
    }

    // 지난주 날짜 가져오기
    private String last_week_days() {
        // 지난주 월요일과 일요일 날자 구하기
        Calendar cal = Calendar.getInstance();

        cal.add(Calendar.DATE, -7);
        int nWeek = cal.get(Calendar.DAY_OF_WEEK);
        cal.add(Calendar.DATE, 2-nWeek);

        // 지난주 월요일
        int nMonth = cal.get(Calendar.MONTH)+1;
        String dayLastWeekFrom = cal.get(Calendar.YEAR) +"-"+ (nMonth<10?"0"+nMonth:nMonth+"") +"-"+ (cal.get(Calendar.DATE)<10?"0"+cal.get(Calendar.DATE):cal.get(Calendar.DATE)+"");

        //지난주 일요일
        cal.add(Calendar.DATE, 7);
        nMonth  = cal.get(Calendar.MONTH)+1;
        String dayLastWeekTo = cal.get(Calendar.YEAR) +"-"+ (nMonth<10?"0"+nMonth:nMonth+"") +"-"+ (cal.get(Calendar.DATE)<10?"0"+cal.get(Calendar.DATE):cal.get(Calendar.DATE)+"");

        // 검증
//        System.out.println(dayLastWeekFrom);
//        System.out.println(dayLastWeekTo);
        return dayLastWeekFrom + "//" + dayLastWeekTo;
    }

    // 이번주 날짜 가져오기
    private String this_week_days() {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        // 이번주 월요일 날짜
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        String dayThisWeekFrom = formatter.format(cal.getTime());

        // 이번주 일요일 날짜
        cal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        cal.add(cal.DATE,8);
        String dayThisWeekTo = formatter.format(cal.getTime());

        // 검증
//        System.out.println(dayThisWeekFrom);
//        System.out.println(dayThisWeekTo);
        return dayThisWeekFrom + "//" + dayThisWeekTo;
    }



}
