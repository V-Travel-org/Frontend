'use client'
import { useState, useEffect } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { jwtDecode } from 'jwt-decode';

export default function CreateTrip() {
  const [organiserId, setOrganiserId] = useState('');
  const [from, setFrom] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [capacity, setCapacity] = useState('');
  const [currentCapacity, setCurrentCapacity] = useState('');
  const [modeOfTravel, setModeOfTravel] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      setOrganiserId(decoded.user.id);
      console.log('Decoded token:', decoded);
    }
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/trips/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          organiserId,
          from,
          destination,
          departureTime,
          capacity: parseInt(capacity),
          currentCapacity: parseInt(currentCapacity),
          modeOfTravel,
          price: parseFloat(price),
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
            <Label htmlFor="from">From</Label>
            <Input
              id="from"
              required
              value={from}
              onChange={(e) => setFrom(e.target.value)}
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
          <Button className="w-full" type="submit">
            Create Trip
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
