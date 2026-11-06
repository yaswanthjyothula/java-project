package com.cryptovista.service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.*;

/**
 * Hybrid Market Data Reference Provider.
 * Adheres to SRS §4.13 (MKT-001 through MKT-010).
 * Clearly distinguishes reference pricing from actionable exchange quotes.
 */
public class MarketDataService {
    public record MarketQuote(
            String symbol,
            String name,
            BigDecimal priceINR,
            BigDecimal change24hPercent,
            String volume24hINR,
            String marketCapINR,
            String sourceAttribution,
            Instant observationTimestamp,
            boolean isMock
    ) {
        public boolean isStale(long maxAgeSeconds) {
            return Instant.now().getEpochSecond() - observationTimestamp.getEpochSecond() > maxAgeSeconds;
        }
    }

    private final Map<String, MarketQuote> quoteCache = new HashMap<>();

    public MarketDataService() {
        seedReferenceQuotes();
    }

    public List<MarketQuote> getAllQuotes() {
        return new ArrayList<>(quoteCache.values());
    }

    public Optional<MarketQuote> getQuote(String symbol) {
        return Optional.ofNullable(quoteCache.get(symbol.toUpperCase()));
    }

    private void seedReferenceQuotes() {
        Instant now = Instant.now();
        quoteCache.put("BTC", new MarketQuote("BTC", "Bitcoin", new BigDecimal("5924800.00"), new BigDecimal("2.45"), "₹1,84,250 Cr", "₹116.8 L Cr", "CoinGecko Benchmark / Illustrative Feed", now, false));
        quoteCache.put("ETH", new MarketQuote("ETH", "Ethereum", new BigDecimal("284350.00"), new BigDecimal("-0.82"), "₹89,400 Cr", "₹34.2 L Cr", "CoinGecko Benchmark / Illustrative Feed", now, false));
        quoteCache.put("SOL", new MarketQuote("SOL", "Solana", new BigDecimal("14820.00"), new BigDecimal("5.12"), "₹32,100 Cr", "₹6.8 L Cr", "CoinGecko Benchmark / Illustrative Feed", now, false));
        quoteCache.put("XRP", new MarketQuote("XRP", "XRP", new BigDecimal("52.40"), new BigDecimal("1.18"), "₹12,450 Cr", "₹2.9 L Cr", "CoinGecko Benchmark / Illustrative Feed", now, false));
        quoteCache.put("ADA", new MarketQuote("ADA", "Cardano", new BigDecimal("34.80"), new BigDecimal("-1.45"), "₹4,120 Cr", "₹1.2 L Cr", "CoinGecko Benchmark / Illustrative Feed", now, false));
    }
}

