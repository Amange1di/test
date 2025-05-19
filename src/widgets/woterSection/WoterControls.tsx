import {Props} from "../../type/type"
export const WoterControls = ({
  pouring,
  pouredCount,
  message,
  onCheck,
  onRemove,
}: Props) => {
  return (
    <div className="woterSection__controls">
      {message && <p className="woterSection__message">{message}</p>}

      <p className="woterSection__text">Выливаний: {pouredCount}</p>

      <button onClick={onCheck} disabled={pouring}>
        Проверить
      </button>
      <button onClick={onRemove} disabled={pouring}>
        Убрать воду
      </button>
    </div>
  );
};
