'use client'
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import CreateTrip from "@/components/trips/createTrip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DrawerDialog } from "@/components/ui/drawerdialog";
import { StarRating } from "@/components/ui/star-rating";
import { useState, useEffect } from "react";
import axios from "axios";
import { Separator } from "@/components/ui/separator";

interface Ride{
  fullName: string;
  modeOfTravel: string;
  currentCapacity: number;
  destination: string;
  departureTime: string;
  totalCapacity: number;
  status: 'open' | 'closed';
  rating: number;
}

interface ISuggestion {
  label: string;
  value: string;
}

// const rides: Ride[] = [
//   { fullName: 'Alice Johnson', modeOfTravel: 'Toyota Camry', currentCapacity: 3,destination: 'Central Park', departureTime: '8:00 AM', totalCapacity: 4, status: 'open', rating: 4.8},
//   { fullName: 'Bob Smith', modeOfTravel: 'Honda Civic', currentCapacity: 2, destination: 'PN Bus Station', departureTime: '9:00 AM', totalCapacity: 3, status: 'closed', rating: 4.0},
//   { fullName: 'Carol Taylor', modeOfTravel: 'Ford Focus', currentCapacity: 1, destination: 'Train Station', departureTime: '10:00 AM', totalCapacity: 2, status: 'open', rating: 3.3},
//   { fullName: 'David Brown', modeOfTravel: 'Chevy Malibu', currentCapacity: 3, destination: 'Central Library', departureTime: '11:00 AM', totalCapacity: 4, status: 'closed', rating: 3.5},
//   { fullName: 'Eve White', modeOfTravel: 'Nissan Altima', currentCapacity: 4, destination: 'Benz Circle', departureTime: '12:00 PM', totalCapacity: 5, status: 'open', rating: 3.8},
//   { fullName: 'Frank Black', modeOfTravel: 'Hyundai Sonata', currentCapacity: 4, destination: 'NTR Circle', departureTime: '1:00 PM', totalCapacity: 5, status: 'closed', rating: 4.2},
//   { fullName: 'Grace Green', modeOfTravel: 'Kia Optima', currentCapacity: 2, destination: 'Airport', departureTime: '2:00 PM', totalCapacity: 3, status: 'open', rating: 4.5},
// ];

export default function page() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [allTrips, setAllTrips] = useState<Ride[]>([]);
  const [from, setFrom] = useState<string>("");
  const [fromSuggestions, setFromSuggestions] = useState<ISuggestion[]>([]);
  const [destination, setDestination] = useState<string>("");
  const [destinationSuggestions, setDestinationSuggestions] = useState<ISuggestion[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/trips/getAllTrips')
      .then(response => response.json())
      .then(data => {
        const trips = data.map((trip:any) => ({
          ...trip,
          fullName: trip.organiserId ? trip.organiserId.fullName : 'Unknown Organizer',
          modeOfTravel: trip.modeOfTravel,
          currentCapacity: trip.capacity - trip.currentCapacity,
          destination: trip.destination,
          departureTime: trip.departureTime,
          totalCapacity: trip.capacity,
          status: trip.status,
          rating: 5, // Hardcoded rating for now
        }));
        setAllTrips(trips);
        console.log('Fetched data:', trips);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCardClick = (ride: Ride) => {
    setSelectedRide(ride);
    setDrawerOpen(true);
  };

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

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 h-full">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Ready for your next ride?
          </h2>
        </div>
        <Tabs defaultValue="rides" className="space-y-4">
          <TabsList>
            <TabsTrigger value="rides">Find Rides</TabsTrigger>
            <TabsTrigger value="host">Host a Ride</TabsTrigger>
          </TabsList>
          <TabsContent value="rides" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    From
                  </CardTitle>
                  <svg xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-4 w-4 text-muted-foreground">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                  </svg>
                </CardHeader>
                <CardContent>
                  <Input
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    handleAutocomplete(e.target.value, "from");
                  }}
                    placeholder="Select your starting location"
                  />
                  {fromSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-auto">
                    {fromSuggestions.map((suggestion, index) => (
                      <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setFrom(suggestion.value);
                            setFromSuggestions([]);
                          }}>
                        {suggestion.label}
                      </li>
                    ))}
                  </ul>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    To
                  </CardTitle>
                  <svg xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-4 w-4 text-muted-foreground">
                  <line x1="2" x2="5" y1="12" y2="12"/>
                  <line x1="19" x2="22" y1="12" y2="12"/>
                  <line x1="12" x2="12" y1="2" y2="5"/>
                  <line x1="12" x2="12" y1="19" y2="22"/>
                  <circle cx="12" cy="12" r="7"/>
                  <circle cx="12" cy="12" r="3"/>
                  </svg>
                </CardHeader>
                <CardContent>
                  <Input
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                      handleAutocomplete(e.target.value, "destination");
                    }}
                      placeholder="Select your destination"
                    />
                    {destinationSuggestions.length > 0 && (
                      <ul className="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-auto">
                      {destinationSuggestions.map((suggestion, index) => (
                        <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setDestination(suggestion.value);
                              setDestinationSuggestions([]);
                            }}>
                          {suggestion.label}
                        </li>
                      ))}
                    </ul>
                    )}
                </CardContent>
              </Card>
              <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4">
                <div className="mb-md:mb-0"><CalendarDateRangePicker /></div>
                <Button>Search for Carpool</Button>
              </div>
            </div>
            <Separator />
            <ScrollArea className="space-y-4 p-4 h-96 overflow-y-auto">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {allTrips.map((ride, index) => (
                  <Card key={index} className="hover:bg-accent transition-colors duration-300" onClick={() => handleCardClick(ride)}>
                    <CardHeader>
                      <CardTitle>{ride.destination}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Organizer: {ride.fullName}
                      </CardDescription>
                      <CardDescription>
                        Vehicle: {ride.modeOfTravel}
                      </CardDescription>
                      <CardDescription>
                        Seats Left: {ride.currentCapacity}
                      </CardDescription>
                      <div>
                        <StarRating rating ={ride.rating} size={16}/>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
            {drawerOpen && selectedRide && (
            <DrawerDialog open={drawerOpen} setOpen={setDrawerOpen} selectedRide={selectedRide} />
            )}
          </TabsContent>
          <TabsContent value="host" className="space-y-4">
            <CreateTrip/>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
