package com.wego.config;

import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Log4j2
@Component
public class AOPConfig {
    @Before("execution(* *..*Controller.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        log.warn("method run: " + joinPoint.getSignature().getName());
        Arrays.stream(joinPoint.getArgs()).parallel().forEach(log::warn);
    }

}
