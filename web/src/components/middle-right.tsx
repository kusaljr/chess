import { useWebSocket } from "@chess/hooks/ws";

export default function MiddleRight() {
  const { moveHistory } = useWebSocket();

  console.log(moveHistory);
  return (
    <div className="pl-40">
      <p className="text-white font-medium ">History</p>

      <div className="relative overflow-x-auto w-48 mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <tbody>
            {
              // in reverse order
              moveHistory
                .slice(0)
                .reverse()
                .map((move, index) => (
                  <tr key={index} className=" border ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap"
                    >
                      {moveHistory.length - index}
                    </th>
                    <td className="px-6 py-4">{move.from}</td>
                    <td className="px-6 py-4">{move.to}</td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
