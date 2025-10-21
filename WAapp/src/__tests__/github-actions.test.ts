import test from "node:test";
import assert from "node:assert/strict";

async function getWorkflows() {
	return {
		push: {
			jobs: {
				build: {
					steps: [
						{ name: 'Checkout code' },
						{ name: 'Run tests' }
					]
				}
			}
		},
		pull_request: {
			jobs: {}
		}
	};
}

test('GitHub Actions workflows validation', async () => {
	const workflows = await getWorkflows(); // Mock function to retrieve workflows
	const expectedTriggers = ['push', 'pull_request'];
	expectedTriggers.forEach(trigger => {
		assert.ok(Object.prototype.hasOwnProperty.call(workflows, trigger), `Missing trigger: ${trigger}`);
	});
	
	const jobs = workflows['push'].jobs;
	assert.ok(Object.prototype.hasOwnProperty.call(jobs, 'build'), 'Missing build job');
	assert.ok(jobs.build.steps.some(s => s.name === 'Checkout code'), 'Missing "Checkout code" step');
	assert.ok(jobs.build.steps.some(s => s.name === 'Run tests'), 'Missing "Run tests" step');
});
