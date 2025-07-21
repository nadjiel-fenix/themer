import { ThemeShowcase } from "./pages";

import { Theme } from "./contexts";

function App() {
  return (
    <Theme.Provider>
      <ThemeShowcase />
    </Theme.Provider>
  );
}

export default App;
