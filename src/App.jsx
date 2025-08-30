import { ThemeProvider } from "./context/ThemeContext.jsx";
import TodoPage from "./pages/TodoPage.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <TodoPage />
    </ThemeProvider>
  );
}
