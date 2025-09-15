// File: app/choose-role/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function ChooseRolePage() {
  const router = useRouter();

  const handleChoose = (role: "buyer" | "seller") => {
    // you could either pass as query or push to specific login role page
    router.push(`/login?role=${role}`);
  };

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      alignItems: "center", justifyContent: "center",
      background: "#f3f4f6"
    }}>
      <div style={{
        padding: "2rem", background: "white", borderRadius: "0.5rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>Login as</h1>
        <button
          onClick={() => handleChoose("buyer")}
          style={{
            width: "100%", padding: "0.75rem", marginBottom: "1rem",
            background: "#2563eb", color: "white", border: "none", borderRadius: "0.375rem",
            cursor: "pointer"
          }}
        >
          Buyer
        </button>
        <button
          onClick={() => handleChoose("seller")}
          style={{
            width: "100%", padding: "0.75rem",
            background: "#059669", color: "white", border: "none", borderRadius: "0.375rem",
            cursor: "pointer"
          }}
        >
          Seller
        </button>
      </div>
    </div>
  );
}
