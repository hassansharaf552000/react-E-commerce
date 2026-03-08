import AppRouter from './router';
import { AppProviders } from './context/AppProviders';

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
