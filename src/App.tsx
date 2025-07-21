import { ThemeShowcase } from "./pages";

import { Theme, Locale } from "./contexts";

function App() {
  return (
    <Locale.Provider>
      <Theme.Provider>
        <ThemeShowcase />
      </Theme.Provider>
    </Locale.Provider>
  );
}

export default App;
