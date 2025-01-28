"use client";

import React, { useState } from "react";
import DataSourcesDashboard from "../DataSources/DataSourcesDashboard";
import { Button } from "@/components/ui/button";

const GoogleFitPage = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_FIT_CLIENT_ID ?? "";
  const redirectUri =
    process.env.NEXT_PUBLIC_GOOGLE_FIT_REDIRECT_URI ?? "http://localhost:3000";
  const scopes = [
    "https://www.googleapis.com/auth/fitness.nutrition.read",
    "https://www.googleapis.com/auth/fitness.sleep.read",
    "https://www.googleapis.com/auth/fitness.blood_pressure.read",
    "https://www.googleapis.com/auth/fitness.body.read",
    "https://www.googleapis.com/auth/fitness.body.write",
  ].join(" ");

  const generateAuthUrl = () => {
    const baseUrl = "https://accounts.google.com/o/oauth2/auth";
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "token",
      scope: scopes,
      include_granted_scopes: "true",
    });

    return `${baseUrl}?${params.toString()}`;
  };

  const extractAccessTokenFromUrl = () => {
    const hashParams = new URLSearchParams(
      window.location.hash.replace("#", ""),
    );
    const token = hashParams.get("access_token");
    if (token) {
      setAccessToken(token);
      window.history.replaceState({}, document.title, "/");
    }
  };

  React.useEffect(() => {
    extractAccessTokenFromUrl();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-xl">Google Fit Integration</h1>
      {!accessToken ? (
        <Button
          onClick={() => (window.location.href = generateAuthUrl())}
          className="mb-4"
        >
          Authenticate with Google
        </Button>
      ) : (
        <DataSourcesDashboard accessToken={accessToken} />
      )}
    </div>
  );
};

export default GoogleFitPage;
