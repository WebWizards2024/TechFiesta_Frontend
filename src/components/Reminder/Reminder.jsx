import { useQueryClient } from "@tanstack/react-query";
import HandleReminder from "./HandleReminder";

function Reminder() {
  // const medicArr = [];
  // const dietArr = [];
  // const exerciseArr = [];
  const queryClient = useQueryClient();
  const { healthData } = queryClient.getQueryData(["auth"]);
  console.log(healthData);

  return (
    <div>
      <div className="p-4 bg-[#258bff] space-y-4 rounded-md">
        <h1>Medicine Alerts</h1>
        <HandleReminder
          placeholder="medicine name"
          fieldName="medic"
        />
        {healthData.medicReminder.map((mr, i) => {
          return <HandleReminder eventId={mr} key={i} />;
          // return <p>sdmf</p>;
        })}
      </div>
    </div>
  );
}

export default Reminder;
