import { useState, useEffect, useRef } from "react";
import { BigGlass, SmallGlass2 } from "../../shared/svg";
import "./woterSection.scss";
import { Modal } from "../../features/modal/Modal";
import water from "../../shared/mp3/water-splash.mp3";
import finsh from "../../shared/mp3/finsh.mp3";

type Settings = {
  vesselCap: number;
  pourSize: number;
  description: string;
  id: string;
};

export const WoterSection = () => {
  const [settingsList, setSettingsList] = useState<Settings[]>([]);
  const [currentSettings, setCurrentSettings] = useState<Settings | null>(null);

  const [value, setValue] = useState(0);
  const [pouring, setPouring] = useState(false);
  const [pouredCount, setPouredCount] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = "https://6829f512ab2b5004cb355781.mockapi.io/s";

  // Audio refs для звуков
  const waterAudio = useRef<HTMLAudioElement | null>(null);
  const finshAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка сети");
        return res.json();
      })
      .then((data: Settings[]) => {
        setSettingsList(data);
        if (data.length > 0) {
          setCurrentSettings(data[0]);
          setValue(0);
          setPouredCount(0);
          setMessage("");
          setModalMessage("");
          setIsModalOpen(false);
        }
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
      });
  }, []);

  useEffect(() => {
    waterAudio.current = new Audio(water);
    finshAudio.current = new Audio(finsh);
  }, []);

  if (!currentSettings) {
    return <div>Загрузка...</div>;
  }

  const { vesselCap, pourSize, description } = currentSettings;
  const maxPourCount = Math.ceil(vesselCap / pourSize);

  const handlePour = () => {
    if (value >= vesselCap || pouring) return;

    setPouring(true);

    setTimeout(() => {
      if (waterAudio.current) {
        waterAudio.current.currentTime = 0;
        waterAudio.current.play();
      }
    }, 600);

    setTimeout(() => {
      setPouredCount((prev) => prev + 1);
    }, 2000);

    setTimeout(() => {
      setValue((prev) => Math.min(prev + pourSize, vesselCap));
    }, 2000);

    setTimeout(() => {
      setPouring(false);
    }, 2000);
  };

  // Функция для открытия модального окна и проигрывания звука
  const openModalWithSound = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);

    if (finshAudio.current) {
      finshAudio.current.currentTime = 0;
      finshAudio.current.play();
    }
  };

  const handleCheck = () => {
    if (pouredCount === maxPourCount) {
      openModalWithSound("Правильно! Сосуд заполнен.");
      setMessage("");
    } else {
      setMessage(`Нужно вылить ровно ${maxPourCount} раз(а), а вылили ${pouredCount}.`);
      setIsModalOpen(false);
    }
  };

  const handleRemove = () => {
    if (value > 0 && !pouring) {
      setValue((prev) => Math.max(prev - pourSize, 0));
      setPouredCount((prev) => Math.max(prev - 1, 0));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="woterSection">
      <p>{description}</p>
      <p>api-(https://6829f512ab2b5004cb355781.mockapi.io/s)</p>

      <div className="woterSection__container">
        <div
          className={`woterSection__smallGlass ${pouring ? "pouring" : ""}`}
          onClick={handlePour}
        >
          <SmallGlass2 value={pourSize} vesselCap={vesselCap} pourSize={pourSize} />
        </div>

        <div className="woterSection__bigGlass">
          <BigGlass value={value} pouring={pouring} vesselCap={vesselCap} />
        </div>
      </div>

      {isModalOpen && (
        <Modal
          leftWeights={[]}
          rightWeights={[]}
          message={modalMessage}
          onClose={closeModal}
        />
      )}

      <div className="woterSection__controls">
        {message && <p className="woterSection__message">{message}</p>}

        <p className="woterSection__text">Выливаний: {pouredCount}</p>
        <button onClick={handleCheck} disabled={pouring}>
          Проверить
        </button>
        <button onClick={handleRemove} disabled={pouring}>
          Убрать воду
        </button>
      </div>
    </div>
  );
};
