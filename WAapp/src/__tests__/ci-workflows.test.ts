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