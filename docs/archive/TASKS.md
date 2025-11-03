// Role and Goal: You are an expert React developer creating a reusable Button component. The goal is to build a flexible, accessible, and visually consistent button that will be used throughout the application.

// Task: Create a new file at `src/components/Button.tsx` and write the code for the Button component.

// Design System Constraints:
// - MUST use the design tokens from `tailwind.config.js`. Use classes like `bg-accent`, `text-primary-text`, `rounded-md`, `p-2`, etc.
// - DO NOT use arbitrary values.

// Component API (Props):
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Structural and Functional Requirements:
// - The component should render a standard HTML `<button>` element.
// - It should accept all standard button attributes (e.g., `onClick`, `disabled`, `type`).
// - The `variant` prop controls the styling:
//   - 'primary': Solid background color (`bg-accent`), white text.
//   - 'secondary': Bordered (`border-border`), transparent background, primary text color.
//   - 'ghost': No border or background, primary text color.
// - The `size` prop controls padding and font size.
// - If `leftIcon` or `rightIcon` are provided, render them inside the button next to the children, with appropriate spacing.

// Interaction States:
// - On hover, primary and secondary variants should become slightly brighter/darker. Ghost variant should get a subtle background color.
// - On focus, a visible outline ring should appear (e.g., `focus:ring-2 focus:ring-accent`).
// - When disabled, the button should have reduced opacity (`opacity-50`) and pointer events should be disabled (`cursor-not-allowed`).

// Accessibility:
// - The component must be fully keyboard navigable.
// - Ensure `aria-disabled` is set when the button is disabled.

// Now, write the complete code for the `Button.tsx` component.

// Role and Goal: You are a UI developer assembling a page view from existing components. Your goal is to create the main Dashboard page layout.

// Task: Create a new file at `src/pages/Dashboard.tsx` and write the code for the Dashboard page. Assume all necessary atomic and composite components (`ContinueLearningCard`, `DailyGoalsCard`, `ReviewQueueCard`, `StatsOverviewCard`, `StatCard`) have already been created.

// Structural and Functional Requirements:
// - The main container should be a `div` with appropriate padding.
// - The layout should be a responsive grid (e.g., using CSS Grid). On larger screens (md and up), it should be a two or three-column layout. On smaller screens, it should stack into a single column.
// - The `ContinueLearningCard` should be the most prominent item, spanning two columns if possible on larger screens.
// - The `DailyGoalsCard` and `ReviewQueueCard` should be placed near the top, in the first row.
// - The `StatsOverviewCard` should be a container that holds multiple `StatCard` components, displayed in a row.
// - Use placeholder data for all components for now. For example, for the `ContinueLearningCard`, pass props like `title="Present Perfect Tense"`, `course="Grammar Essentials"`, `progress={45}`.

// Now, write the complete code for the `Dashboard.tsx` page component.

// Role and Goal: You are a front-end developer setting up the navigation structure for the entire application.

// Task: Modify the `App.tsx` file to implement client-side routing using `react-router-dom`.

// Structural and Functional Requirements:
// 1. Import `BrowserRouter`, `Routes`, and `Route` from `react-router-dom`.
// 2. Import all the page components you have created: `Dashboard`, `LearnPage`, `ReviewPage`, `ResourceLibrary`, `ProfilePage`.
// 3. Create a persistent layout component (e.g., `MainLayout.tsx`) that includes a `Sidebar` (for desktop) and a `BottomNav` (for mobile). This layout component should render an `<Outlet />` for the page content.
// 4. In `App.tsx`, set up the routes within the `BrowserRouter`.
// 5. The root path `/` should render the `Dashboard` page inside the `MainLayout`.
// 6. Define routes for `/learn`, `/review`, `/resources`, and `/profile`, each rendering their respective page component within the `MainLayout`.

// Now, write the code for the `MainLayout.tsx` component and the final `App.tsx` file with the complete routing structure.

// Role and Goal: You are a Quality Assurance (QA) engineer responsible for ensuring the application's stability and functionality. Your goal is to identify and resolve issues before deployment.

// Task: Review the codebase for issues, run all available tests, and report on the application's health.

// Requirements:
// 1.  **Analyze Failed Workflows:** Systematically go through any failed CI/CD pipeline runs or automated checks. Identify the root cause of each failure.
// 2.  **Execute Test Suite:** Run the complete test suite for the application, including all unit, integration, and end-to-end tests.
// 3.  **Functional Testing:** Manually test all critical user flows defined in the Information Architecture (e.g., onboarding, completing a lesson, taking a quiz, navigating between pages) to ensure they work as expected. [46]
// 4.  **Accessibility Check:** Use automated tools (like Axe or Lighthouse) to perform an accessibility audit and ensure the application meets WCAG standards. [46, 47]
// 5.  **Document and Report:** Document all identified bugs, errors, and failed tests. Prioritize the issues based on severity and their impact on the user experience.

// Now, provide a summary of the testing results and a list of commands needed to run the test suite.

