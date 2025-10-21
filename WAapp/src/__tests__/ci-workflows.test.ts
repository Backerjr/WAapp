import test from "node:test";

test('CI workflows simulation', () => {
    const scenarios = [
        { scenario: 'successful build', expected: true },
        { scenario: 'failed build', expected: false },
        { scenario: 'timeout', expected: false },
        { scenario: 'dependency error', expected: false }
    ];

    scenarios.forEach(({ scenario, expected }) => {
        const result = simulateCIWorkflow({ scenario });
        expect(result).toBe(expected);
    });
});

/**
 * Simulates the result of a CI workflow based on a scenario string.
 *
 * The function examines the provided scenario and returns:
 * - `true` for a successful build scenario,
 * - `false` for known failure scenarios,
 * - `null` for any unrecognized scenario.
 *
 * @param scenario - The scenario to simulate. Expected values (case-sensitive):
 *   - `"successful build"` — the CI run completes successfully (returns `true`).
 *   - `"failed build"`, `"timeout"`, `"dependency error"` — known failure outcomes (returns `false`).
 *   Any other string is treated as unrecognized and yields `null`.
 *
 * @returns `boolean | null` — `true` for success, `false` for failure, `null` if the scenario is not handled.
 *
 * @remarks
 * - The check is exact and case-sensitive; pass the scenario string exactly as listed above.
 * - This is a pure simulation helper and has no side effects.
 *
 * @example
 * // Successful build
 * simulateCIWorkflow({ scenario: "successful build" }); // returns true
 *
 * @example
 * // Known failure
 * simulateCIWorkflow({ scenario: "timeout" }); // returns false
 *
 * @example
 * // Unrecognized scenario
 * simulateCIWorkflow({ scenario: "network glitch" }); // returns null
 */
/**
 * Simulates the outcome of a CI workflow for a given scenario string.
 *
 * @param options - Options object.
 * @param options.scenario - A scenario name describing the CI run. Recognized values:
 *   - "successful build"  => returns true
 *   - "failed build"      => returns false
 *   - "timeout"           => returns false
 *   - "dependency error"  => returns false
 *   - any other value     => returns null
 *
 * @returns true for a successful build, false for known failure scenarios, and null for unknown scenarios.
 *
 * @remarks
 * This helper is intended for test code to emulate CI behavior deterministically based on
 * human-readable scenario identifiers.
 *
 * @example
 * // returns true
 * simulateCIWorkflow({ scenario: "successful build" });
 *
 * @example
 * // returns null (unrecognized scenario)
 * simulateCIWorkflow({ scenario: "network glitch" });
 */
/**
 * Simulates the outcome of a CI workflow based on a scenario name.
 *
 * @param scenario - A string describing the CI scenario. Known values:
 *   - "successful build" -> represents a build that completed successfully.
 *   - "failed build" -> represents a build that failed.
 *   - "timeout" -> represents a build that timed out.
 *   - "dependency error" -> represents a build that failed due to dependency issues.
 *   Any other value is treated as unknown.
 *
 * @returns `true` if the scenario represents a successful build,
 * `false` if the scenario represents a failure (failed build, timeout, or dependency error),
 * or `null` if the scenario is not recognized.
 *
 * @example
 * ```ts
 * const result = simulateCIWorkflow({ scenario: 'successful build' }); // true
 * const unknown = simulateCIWorkflow({ scenario: 'intermittent failure' }); // null
 * ```
 */
function simulateCIWorkflow({ scenario }: { scenario: string }): boolean | null {
    switch (scenario) {
        case 'successful build':
            return true;
        case 'failed build':
        case 'timeout':
        case 'dependency error':
            return false;
        default:
            return null;
    }
}