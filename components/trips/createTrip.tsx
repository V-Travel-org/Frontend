'use client'
// Use the updated import statements based on your project's structure.
import { useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateTrip() {
  const [organiserId, setOrganiserId] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [capacity, setCapacity] = useState('');
  const [currentCapacity, setCurrentCapacity] = useState('');
  const [modeOfTravel, setModeOfTravel] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://192.168.80.31:3000/api/trips/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          organiserId,
          destination,
          departureTime,
          capacity: parseInt(capacity),
          currentCapacity: parseInt(currentCapacity),
          modeOfTravel,
          price: parseFloat(price),
          status,
        }),
      });

      if (response.status === 201) {
        alert('Trip created successfully');
      } else {
        alert('Trip creation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create Trip</CardTitle>
        <CardDescription>Enter trip details to create a new trip</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="organiserId">Organiser ID</Label>
            <Input
              id="organiserId"
              required
              value={organiserId}
              onChange={(e) => setOrganiserId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
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
            <Label htmlFor="currentCapacity">Current Capacity</Label>
            <Input
              id="currentCapacity"
              required
              type="number"
              value={currentCapacity}
              onChange={(e) => setCurrentCapacity(e.target.value)}
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
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              required
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
