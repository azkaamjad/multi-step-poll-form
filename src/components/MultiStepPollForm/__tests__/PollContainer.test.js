import { render, screen, fireEvent , waitFor } from '@testing-library/react';
import PollContainer from '../MultiStepPollContainer';


test('renders the first poll question correctly', () => {
  render(<PollContainer />);
  
  // Get the title of the poll step using the test ID
  const firstQuestion = screen.getByTestId('poll-step');
  expect(firstQuestion)?.toHaveTextContent('How was your week overall?');
});

describe('PollContainer', () => {
  beforeEach(() => {
    render(<PollContainer />);
  });

  test('renders the correct number of dots', async () => {
    // Simulate selecting the first option to trigger the rendering of dots
    const buttons = screen?.getAllByRole('button');
    fireEvent.click(buttons[0]); // Click "Great!" to progress to the next question

    // Wait for the dots to be rendered
    await waitFor(() => {
      // Verify that there are 6 question dots
      const dots = [];
      for (let i = 0; i < 4; i++) {
        dots?.push(screen?.getByTestId(`dot-${i}`));
      }

      // Check for the final dot
      const finalDot = screen?.getByTestId('final-dot');

      // Assertions
      expect(dots.length)?.toBe(4);
      expect(finalDot)?.toBeInTheDocument(); // Check that the final dot is also rendered
    });
  });
});



