import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useToast } from "./use-toast"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


interface Ride {
  _id: string,
  fullName: string;
  modeOfTravel: string;
  currentCapacity: number;
  totalCapacity: number;
  destination: string;
  departureTime: string;
  status: 'open' | 'closed';
  rating: number;
}

export function DrawerDialog({open, setOpen, selectedRide}: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, selectedRide: Ride}) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Ride Details</DrawerTitle>
            <DrawerDescription>
              Review the details of the ride below. If you want to join this ride, click 'Request to Join'.
            </DrawerDescription>
          </DrawerHeader>
          <ConfirmRideForm className="px-4" ride={selectedRide} />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Ride Details</DrawerTitle>
          <DrawerDescription>
            Review the details of the ride below. If you want to join this ride, click the button below.
          </DrawerDescription>
        </DrawerHeader>
        <ConfirmRideForm className="px-4" ride={selectedRide} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ConfirmRideForm({ className, ride }: {className?: string, ride: Ride}) {
  const {toast} = useToast();
  const labelStyle = "block text-sm font-medium text-gray-700";
  const valueStyle = "mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-600";
  const cardStyle = "bg-white shadow overflow-hidden rounded-lg px-4 py-5 sm:p-6";
  const handleJoinRide = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`http://localhost:3000/api/trips/requestJoinTrip/${ride._id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Request to join sent successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error sending join request:', error);
      alert('Failed to send join request.');
    }
  };

  return (
    <div className={cn("grid items-start gap-4", className)}>
      <div className={cardStyle}>
        <div className={labelStyle}>Departure Time</div>
        <div className={valueStyle} id="departure-time">
          {ride.departureTime}
        </div>
      </div>
      <div className={cardStyle}>
        <div className={labelStyle}>Capacity</div>
        <div className={valueStyle} id="capacity">{`${ride.totalCapacity - ride.currentCapacity}/${ride.totalCapacity}`}</div>
      </div>
      <div className={cardStyle}>
        <div className={labelStyle}>Destination</div>
        <div className={valueStyle} id="destination">{ride.destination}</div>
      </div>
      <div className={cardStyle}>
        <div className={labelStyle}>Mode of Travel</div>
        <div className={valueStyle} id="mode-of-  travel">{ride.modeOfTravel}</div>
      </div>
      <div className={cardStyle}>
        <div className={labelStyle}>Status</div>
        <div className={valueStyle}id="status">{ride.status}</div>
      </div>
      <div className={cardStyle}>
        <div className={labelStyle}>Rating</div>
        <div className={valueStyle} id="rating">{ride.rating}</div>
      </div>
      <Button onClick={handleJoinRide}>Request to Join</Button>
    </div>
  );
}