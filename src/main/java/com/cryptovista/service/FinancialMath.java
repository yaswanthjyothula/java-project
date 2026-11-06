package com.cryptovista.service;

import java.math.BigDecimal;
import java.math.RoundingMode;

public final class FinancialMath {
    public static final int SCALE_CURRENCY = 2;
    public static final int SCALE_CRYPTO = 8;
    public static final int SCALE_CALCULATION = 12;
    public static final RoundingMode ROUNDING = RoundingMode.HALF_UP;

    private FinancialMath() {}

    public static BigDecimal calculateNotional(BigDecimal quantity, BigDecimal price) {
        if (quantity == null || price == null) return BigDecimal.ZERO.setScale(SCALE_CURRENCY, ROUNDING);
        return quantity.multiply(price).setScale(SCALE_CURRENCY, ROUNDING);
    }

    public static BigDecimal calculateFee(BigDecimal notional, BigDecimal feeRate) {
        if (notional == null || feeRate == null) return BigDecimal.ZERO.setScale(SCALE_CURRENCY, ROUNDING);
        return notional.multiply(feeRate).setScale(SCALE_CURRENCY, ROUNDING);
    }

    public static BigDecimal calculateTotalCost(BigDecimal notional, BigDecimal fee, boolean isBuy) {
        if (isBuy) {
            return notional.add(fee).setScale(SCALE_CURRENCY, ROUNDING);
        } else {
            return notional.subtract(fee).setScale(SCALE_CURRENCY, ROUNDING);
        }
    }

    public static BigDecimal calculatePnl(BigDecimal currentPrice, BigDecimal costBasis, BigDecimal quantity) {
        if (currentPrice == null || costBasis == null || quantity == null) {
            return BigDecimal.ZERO.setScale(SCALE_CURRENCY, ROUNDING);
        }
        BigDecimal priceDiff = currentPrice.subtract(costBasis);
        return priceDiff.multiply(quantity).setScale(SCALE_CURRENCY, ROUNDING);
    }
}

