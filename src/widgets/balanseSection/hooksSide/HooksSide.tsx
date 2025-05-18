import React from "react";
import "./hooksSide.scss"
interface HooksSideProps {
  hooks: number[];
  weights: (number | null)[];
  side: "left" | "right";
  onDrop: (side: "left" | "right", index: number) => void;
  onDragStart: (weight: number, index: number, side: "left" | "right") => void;
}

export const HooksSide: React.FC<HooksSideProps> = ({
  hooks,
  weights,
  side,
  onDrop,
  onDragStart,
}) => {
  return (
    <div className={`balanceSection_balka_${side}`}>
      {hooks.map((num, index) => (
        <div
          key={num}
          className="balanceSection_balka_hooks"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop(side, index)}
        >
          <span>{num}</span>
          <div className="balanceSection_balka_hooks_svg"></div>
          {weights[index] !== null && (
            <div
              className="balanceSection_balka_hooks_masa"
              draggable
              onDragStart={() => onDragStart(weights[index]!, index, side)}
            >
              <h3>{weights[index]}</h3>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
