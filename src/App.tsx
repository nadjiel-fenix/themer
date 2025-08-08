import { ThemeShowcase } from "./pages";

import { Theme, Locale } from "./contexts";

function App() {
  return (
    <Theme.Provider>
      <Locale.Provider>
        <ThemeShowcase />
      </Locale.Provider>
    </Theme.Provider>
  );
}

export default App;
