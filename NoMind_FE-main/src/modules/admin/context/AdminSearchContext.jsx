import { createContext, useContext, useState } from "react";

const AdminSearchContext = createContext({
  globalSearchQuery: "",
  setGlobalSearchQuery: () => {},
});

export function AdminSearchProvider({ children }) {
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  return (
    <AdminSearchContext.Provider
      value={{ globalSearchQuery, setGlobalSearchQuery }}
    >
      {children}
    </AdminSearchContext.Provider>
  );
}

export function useAdminSearch() {
  return useContext(AdminSearchContext);
}
