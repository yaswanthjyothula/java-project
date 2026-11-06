package com.cryptovista;

import java.lang.reflect.Method;

public class TestRunner {
    public static void main(String[] args) {
        System.out.println("=================================================================");
        System.out.println("   CRYPTOVISTA X ENTERPRISE — JUNIT 5 DOMAIN TEST HARNESS        ");
        System.out.println("=================================================================");

        SimulationAndSecurityTest testInstance = new SimulationAndSecurityTest();
        Method[] methods = SimulationAndSecurityTest.class.getDeclaredMethods();
        int passed = 0;
        int failed = 0;

        for (Method m : methods) {
            if (m.isAnnotationPresent(org.junit.jupiter.api.Test.class)) {
                try {
                    testInstance.setup();
                    m.invoke(testInstance);
                    System.out.println("  ✓ PASS: " + m.getName());
                    passed++;
                } catch (Throwable t) {
                    System.err.println("  ✗ FAIL: " + m.getName() + " -> " + t.getCause());
                    t.printStackTrace();
                    failed++;
                }
            }
        }

        System.out.println("=================================================================");
        System.out.println("   TEST EXECUTION SUMMARY: " + passed + " PASSED, " + failed + " FAILED");
        System.out.println("=================================================================");

        if (failed > 0) {
            System.exit(1);
        }
    }
}

