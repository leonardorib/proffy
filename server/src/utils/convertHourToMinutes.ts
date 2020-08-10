export default function convertHourToMinutes(time: string) {
  // Spliting and coverting to number
  const [hour, minutes] = time.split(':').map(Number);

  const timeInMinutes = hour * 60 + minutes;

  return timeInMinutes;
}
