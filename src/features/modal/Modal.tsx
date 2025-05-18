import React from "react";
import "./modal.scss";
interface ModalProps {
  leftWeights: (number | null)[];
  rightWeights: (number | null)[];
  onClose: () => void;
  message?: string;
}

export const Modal: React.FC<ModalProps> = ({ leftWeights, rightWeights, onClose, message }) => {
  return (
    <div className="modaloverlay">
      <div className="modalcontent">
        {message ? (
          <p>{message}</p>
        ) : (
          <div className="modalformula">
            <span className="modalformula_strong">
              {leftWeights
                .map((weight, i) => (weight !== null ? `${weight}×${10 - i}` : null))
                .filter(Boolean)
                .join(" + ")}
              {" = "}
              {rightWeights
                .map((weight, i) => (weight !== null ? `${weight}×${i + 1}` : null))
                .filter(Boolean)
                .join(" + ")}
            </span>
          </div>
        )}
        <button onClick={onClose} className="modalbtn">
          Далее
        </button>
        <div className="emoji-burst">
          <span role="img" aria-label="smile" className="emoji">
            😃
          </span>
          <span className="burst burst1" />
          <span className="burst burst2" />
          <span className="burst burst3" />
        </div>
      </div>
    </div>
  );
};
