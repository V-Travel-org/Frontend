"use client";
import { useState, useEffect, Fragment } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface ISuggestion {
  label: string;
  value: string;
}

export default function CreateTrip() {
  const [organiserId, setOrganiserId] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [fromSuggestions, setFromSuggestions] = useState<ISuggestion[]>([]);
  const [destination, setDestination] = useState<string>("");
  const [destinationSuggestions, setDestinationSuggestions] = useState<ISuggestion[]>([]);
  const [departureTime, setDepartureTime] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [modeOfTravel, setModeOfTravel] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      setOrganiserId(decoded.user.id);
    }
  }, []);

  const handleAutocomplete = async (
    input: string,
    type: "from" | "destination"
  ) => {
    if (!input) {
      type === "from" ? setFromSuggestions([]) : setDestinationSuggestions([]);
      return;
    }

    const apiKey = "pk.dec15f483f420b06eb90afa6878cdccd";
    const countrycodes = "IN"; // ISO 3166-1 alpha-2 code for India
    try {
      const response = await axios.get(
        `https://api.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${input}&countrycodes=${countrycodes}`
      );
      if (response.data) {
        const suggestions: ISuggestion[] = response.data.map((item: any) => ({
          label: item.display_name,
          value: item.display_name,
        }));
        type === "from"
          ? setFromSuggestions(suggestions)
          : setDestinationSuggestions(suggestions);
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleSelectSuggestion = (
    value: string,
    type: "from" | "destination"
  ) => {
    if (type === "from") {
      setFrom(value);
      setFromSuggestions([]);
    } else {
      setDestination(value);
      setDestinationSuggestions([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/trips/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          organiserId,
          from,
          destination,
          departureTime,
          capacity: parseInt(capacity),
          modeOfTravel,
          price: parseFloat(price),
        }),
      });

      if (response.status === 201) {
        alert("Trip created successfully");
      } else {
        alert("Trip creation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create Trip</CardTitle>
        <CardDescription>
          Enter trip details to create a new trip
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 relative">
            <Label htmlFor="from">From</Label>
            <Input
              id="from"
              required
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                handleAutocomplete(e.target.value, "from");
              }}
            />
            {fromSuggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 z-10">
                {fromSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      handleSelectSuggestion(suggestion.value, "from")
                    }
                  >
                    {suggestion.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              required
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                handleAutocomplete(e.target.value, "destination");
              }}
            />
            {destinationSuggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 z-10">
                {destinationSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      handleSelectSuggestion(suggestion.value, "destination")
                    }
                  >
                    {suggestion.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="departureTime">Departure Time</Label>
            <Input
              id="departureTime"
              required
              type="datetime-local"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              required
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="modeOfTravel">Mode of Travel</Label>
            <Input
              id="modeOfTravel"
              required
              value={modeOfTravel}
              onChange={(e) => setModeOfTravel(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              required
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <Button className="w-full" type="submit">
            Create Trip
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
