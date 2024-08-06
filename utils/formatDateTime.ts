import { format, parseISO } from "date-fns";

const formatDateTime = (
  dateTimeString: string
): { date: string; time: string } => {
  const dateObj = parseISO(dateTimeString);

  const formattedDate = format(dateObj, "MMM dd, yyyy");

  const formattedTime = format(dateObj, "h:mma").toLowerCase();

  return { date: formattedDate, time: formattedTime };
};

export default formatDateTime;