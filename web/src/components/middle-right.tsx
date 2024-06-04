import { useWebSocket } from "@chess/hooks/ws";
import { BrainIcon } from "lucide-react";
import { RiRobot2Fill } from "react-icons/ri";

export default function MiddleRight() {
  const { moveHistory, playing } = useWebSocket();

  return (
    <div className="pl-40">
      {playing && (
        <div>
          <p className="text-white font-medium ">History</p>

          <div className="relative overflow-x-auto w-60 mt-5 h-[520px] border">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-auto overflow-auto ">
              <tbody>
                {
                  // in reverse order
                  moveHistory
                    .slice(0)
                    .reverse()
                    .map((move, index) => (
                      // odd and even rows have different background colors
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                        }`}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap"
                        >
                          {moveHistory.length - index}
                        </th>
                        <td className="px-6 py-4 text-gray-300">{move.from}</td>
                        <td className="px-6 py-4 text-gray-300">{move.to}</td>
                        <td>
                          {index % 2 === 0 ? (
                            <RiRobot2Fill className="text-gray-200" />
                          ) : (
                            <BrainIcon className="text-gray-200 h-4 w-4" />
                          )}
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
