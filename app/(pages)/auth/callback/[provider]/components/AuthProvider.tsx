"use client";

import Card from "@/components/Card";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const AuthProvider = () => {
  const router = useRouter();
  const query = useSearchParams();
  const { provider } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/auth/${provider}/callback?${new URLSearchParams(query)}`
      );
      const data = await response.json();
      setCookie("token", data.token);
      router.replace("/");
      router.refresh();
    };

    fetchData();
  }, [query, provider, router]);

  return (
    <Card>
      <div className="d-flex gap-1 align-items-center text-warning p-4 justify-content-center">
        <span style={{ fontSize: 18 }}>HARD</span>

        <svg xmlns="http://www.w3.org/2000/svg" width={36} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M5,8A4,4 0 0,1 9,12A4,4 0 0,1 5,16A4,4 0 0,1 1,12A4,4 0 0,1 5,8M12,1A4,4 0 0,1 16,5A4,4 0 0,1 12,9A4,4 0 0,1 8,5A4,4 0 0,1 12,1M12,15A4,4 0 0,1 16,19A4,4 0 0,1 12,23A4,4 0 0,1 8,19A4,4 0 0,1 12,15M19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16A4,4 0 0,1 15,12A4,4 0 0,1 19,8M19,10A2,2 0 0,0 17,12A2,2 0 0,0 19,14A2,2 0 0,0 21,12A2,2 0 0,0 19,10M12,17A2,2 0 0,0 10,19A2,2 0 0,0 12,21A2,2 0 0,0 14,19A2,2 0 0,0 12,17M12,3A2,2 0 0,0 10,5A2,2 0 0,0 12,7A2,2 0 0,0 14,5A2,2 0 0,0 12,3Z"
          />
        </svg>
        <span style={{ fontSize: 18 }}>SCORE</span>
      </div>
      <Card.Body>
        <div className="fs-4 pb-3 d-flex align-items-center gap-3 justify-content-center">
          <div className="spinner-border text-dark" />
          <span>{`We're logging you in – just a moment...`}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AuthProvider;
