import React from "react";
import "./availableWeights.scss"
import rest from "../../../shared/img/rest.png"
interface AvailableWeightsProps {
  availableWeights: number[];
  onDragStart: (weight: number, index: number) => void;
  onClear: () => void;
  onCheck: () => void;
  errorMessage: string | null;
}

export const AvailableWeights: React.FC<AvailableWeightsProps> = ({
  availableWeights,
  onDragStart,
  onClear,
  onCheck,
  errorMessage,
}) => {
  return (
    <div className="balanceSection_weights">
      <div className="balanceSection_weights_group">
        {availableWeights.map((weight, index) => (
          <div
            key={weight + "_" + index}
            className="balanceSection_weight"
            draggable
            onDragStart={() => onDragStart(weight, index)}
          >
            {weight}
          </div>
        ))}
        <button onClick={onClear} className="rest"><img src={rest} alt="" /></button>
        <button onClick={onCheck}>Проверить</button>
      </div>
      {errorMessage && (
        <div className="error-message" style={{ color: "red", marginTop: "10px" }}>
          {errorMessage}
        </div>
      )}
      <p>api-(https://682857da6b7628c52912fd96.mockapi.io/a)</p>
    </div>
  );
};
