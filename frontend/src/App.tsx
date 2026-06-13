import { AuthProvider } from './context/AuthContext.tsx';

function App() {
  return (
    <AuthProvider>
      <div>
        <header>
          <h1>BookManager</h1>
        </header>
        <main>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;