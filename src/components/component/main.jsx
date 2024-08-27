"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export function Main() {
  const [petId, setPetId] = useState("");
  const [petData, setPetData] = useState(null);
  const [error, setError] = useState(null);

  // Assuming you have a variable for the API URL in your environment
  const API_URL = "https://cb81-190-105-161-2.ngrok-free.app/search/"; // Replace with your actual URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/search/${petId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setPetData(data);
    } catch (error) {
      setError(`Error fetching pet data: ${error.message}`);
      console.error('Error fetching data:', error); // Optional: Log detailed error
    }
  };
  return (
    (<div
      className="flex min-h-[100dvh] flex-col bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0]">
      <header
        className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md shadow-md">
        <Link href="#" className="text-2xl font-bold text-primary" prefetch={false}>
          PetFinder
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}>
            Report Lost Pet
          </Link>
          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-muted/90 focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-2"
            prefetch={false}>
            Login
          </Link>
          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-muted/90 focus:outline-none focus:ring-2 focus:ring-muted focus:ring-offset-2"
            prefetch={false}>
            Pricing
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div
          className="w-full max-w-md p-6 rounded-lg bg-white/80 backdrop-blur-md shadow-lg">
          <h1 className="text-3xl font-bold text-primary mb-4">Find Your Pet</h1>
          <p className="text-muted-foreground mb-6">Enter the ID of the pet you're looking for to get started.</p>
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Enter pet ID"
              className="flex-1 rounded-md border-muted focus:border-primary focus:ring-primary"
              value={petId}
              onChange={(e) => setPetId(e.target.value)} />
            <Button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Search
            </Button>
          </form>
        </div>
      </main>
      {petData && (
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <Card
            className="w-full max-w-md p-6 rounded-lg bg-white/80 backdrop-blur-md shadow-lg">
            <CardHeader>
              <CardTitle>{petData.nombre}</CardTitle>
              <CardDescription>
                Edad: {petData.edad} ({petData.fechaEdad})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <img
                    src="/placeholder.svg"
                    width={300}
                    height={300}
                    alt={petData.nombre}
                    className="rounded-lg"
                    style={{ aspectRatio: "300/300", objectFit: "cover" }} />
                </div>
                <div>
                  <img
                    src="/placeholder.svg"
                    width={300}
                    height={300}
                    alt={petData.nombre}
                    className="rounded-lg"
                    style={{ aspectRatio: "300/300", objectFit: "cover" }} />
                </div>
                <div>
                  <img
                    src="/placeholder.svg"
                    width={300}
                    height={300}
                    alt={petData.nombre}
                    className="rounded-lg"
                    style={{ aspectRatio: "300/300", objectFit: "cover" }} />
                </div>
              </div>
              <div className="mt-4">
                <div className="font-bold">Hogar:</div>
                <div>{petData.hogar}</div>
              </div>
              <div className="mt-4">
                <div className="font-bold">Dueños:</div>
                <div>
                  {petData.dueno1} / {petData.dueno2}
                </div>
              </div>
              <div className="mt-4">
                <div className="font-bold">Teléfonos:</div>
                <div>
                  {petData.telefono1} / {petData.telefono2} / {petData.telefono3}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {error && (
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div
            className="w-full max-w-md p-6 rounded-lg bg-white/80 backdrop-blur-md shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-4">Error</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
          </div>
        </div>
      )}
    </div>)
  );
}
