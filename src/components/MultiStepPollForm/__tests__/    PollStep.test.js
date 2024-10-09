import { render, screen } from '@testing-library/react';
import PollStep from '../MultiStepPollComponent';

test('renders PollStep component with title', () => {
  render(<PollStep title="How was your week overall?" onSelect={() => {}} renderDots={() => <div />} isAnimating={false} isFinalPoll={false} finalData={[]} />);
  
  const titleElement = screen.getByText(/how was your week overall/i);
  expect(titleElement).toBeInTheDocument();
});


