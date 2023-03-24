import { useState } from "react";
import "./App.css";
import { persistStore } from "redux-persist";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NextUIProvider } from "@nextui-org/react";
import { StoreLoaderComponent } from "./components/ui/molecules/StoreLoader.component";
import { MainPage } from "./pages/Main.page";
import { BrowserRouter } from "react-router-dom";

function App() {
  let persistor = persistStore(store);
  return (
    <div className="App">
      <NextUIProvider>
        <Provider store={store}>
          <PersistGate
            persistor={persistor}
            loading={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100vw",
                  height: "100vh",
                }}
              >
                <StoreLoaderComponent />
              </div>
            }
          >
            <BrowserRouter>
              <MainPage />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </NextUIProvider>
    </div>
  );
}

export default App;
