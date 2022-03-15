import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';

import App from './App';

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

test('Rendering App', async () => {
  process.env.REACT_APP_STAGE = 'mock';
  process.env.REDUX_LOGGER_OFF = 'true';

  render(<App />);
  await waitFor(
    () => {
      screen.debug();
      expect(screen.getByText(/Please wait/i)).toBeInTheDocument();

      jest.advanceTimersByTime(8000);

      screen.debug();
      expect(screen.getByText(/Please wait/i)).toBeInTheDocument();
    },
    { timeout: 10000 }
  );
});

// test('landing on a bad page', () => {
//   const history = createMemoryHistory()
//   history.push('/some/bad/route')
//   render(
//     <Router history={history}>
//       <App />
//     </Router>,
//   )
//
//   expect(screen.getByText(/no match/i)).toBeInTheDocument()
// })
//
// test('rendering a component that uses useLocation', () => {
//   const history = createMemoryHistory()
//   const route = '/some-route'
//   history.push(route)
//   render(
//     <Router history={history}>
//       <LocationDisplay />
//     </Router>,
//   )
//
//   expect(screen.getByTestId('location-display')).toHaveTextContent(route)
// })
//
// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//
//   expect(getByText(/learn/i)).toBeInTheDocument();
// });
