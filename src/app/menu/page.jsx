// app/menu/page.jsx
import { Suspense } from "react";
import MenuClient from "./MenuClient";

export default function MenuPage() {
  return (
    <Suspense fallback={<p>Loading menu...</p>}>
      <MenuClient />
    </Suspense>
  );
}
