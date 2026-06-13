import { AuthProvider } from './context/AuthContext.tsx';
import Router from './components/shared/Router';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;