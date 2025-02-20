export const convertToAmPm = (time) => {
    // Split the time into hours and minutes
    const [hours, minutes] = time.split(":");
  
    // Convert hours to a number
    let hours12 = parseInt(hours, 10);
  
    // Determine AM or PM
    const ampm = hours12 >= 12 ? "PM" : "AM";
  
    // Convert to 12-hour format
    hours12 = hours12 % 12 || 12; // Handle midnight (0 hours)
  
    // Return the formatted time
    return `${hours12}:${minutes} ${ampm}`;
  };