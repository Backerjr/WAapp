import test from "node:test";

test('GitHub Actions workflows validation', async () => {
	const workflows = await getWorkflows(); // Mock function to retrieve workflows
	const expectedTriggers = ['push', 'pull_request'];
	expectedTriggers.forEach(trigger => {
		expect(workflows).toHaveProperty(trigger);
	});
	
	const jobs = workflows['push'].jobs;
	expect(jobs).toHaveProperty('build');
	expect(jobs.build.steps).toContainEqual(expect.objectContaining({ name: 'Checkout code' }));
	expect(jobs.build.steps).toContainEqual(expect.objectContaining({ name: 'Run tests' }));
});