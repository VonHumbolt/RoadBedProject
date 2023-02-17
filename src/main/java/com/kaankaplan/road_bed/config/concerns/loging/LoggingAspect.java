package com.kaankaplan.road_bed.config.concerns.loging;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
@Aspect
public class LoggingAspect {

    private final Logger logger = Logger.getLogger(LoggingAspect.class.getName());

    @Around(value = "@annotation(ToLog)")
    public Object log(ProceedingJoinPoint joinPoint) throws Throwable {
        logger.info("Before " + joinPoint.getSignature().getName() + " ---> : Method is begin");

        Object returnedValue = joinPoint.proceed();
        logger.info("After " + joinPoint.getSignature().getName() + " ---> : Method is done with result : "
                + returnedValue);

        return returnedValue;
    }

    @AfterReturning(value = "@annotation(ToDeleteLog)", returning = "returnedValue")
    public void deleteLog(Object returnedValue) {
        logger.info(returnedValue.toString() + " entity is deleted!");
    }
}
