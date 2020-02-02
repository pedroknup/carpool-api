
import { TIME_TOLERANCE } from '../constants/index';
import { rides } from '../entity/rides';
export const isRideExpired = (ride: rides) => {
  const timeLimit = new Date(ride.time);
  timeLimit.setMinutes(ride.time.getMinutes() + TIME_TOLERANCE);
  return timeLimit.getTime() <= new Date().getTime();
};
