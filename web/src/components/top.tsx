import { useWebSocket } from "../hooks/ws";

export default function TopComponent() {
  const { userId } = useWebSocket();

  const dateString = function dateToWords() {
    const date = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    function getOrdinalSuffix(day: number) {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const suffix = getOrdinalSuffix(day);

    return `${month} ${day}${suffix}, ${year}`;
  };
  return (
    <div className="p-10">
      <div className="flex items-center gap-4">
        <img
          className="w-10 h-10 rounded-full"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chess_piece_-_Black_king.JPG/605px-Chess_piece_-_Black_king.JPG"
          alt=""
        />
        <div className="font-medium text-gray-300">
          <div className="text-xs">
            {userId ? userId : "Connecting to WS..."}
          </div>
          <div className="text-sm text-gray-100">{dateString()}</div>
        </div>
      </div>
    </div>
  );
}
